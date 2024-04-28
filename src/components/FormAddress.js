import React, { memo, useEffect, useState } from 'react'
import {  useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import useInput from '../hooks/useInput'
import { alertVisibility } from '../store/alertStore'
import classes from './FormAddress.module.css'
import { faCreditCard, faMoneyBill, faMoneyCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const InputField = memo(({name, error, value, placeholder, setValue, setWasTouched, isValid, errorMessage}) => {

  const handleChange = ({target}) => {
    setWasTouched(false);
    setValue(target.value)
  }

  const classValidation = error ? classes.invalid : isValid ?  classes.valid : ''
 
  return (
     <div className={classes.inputField}>
          <label htmlFor={name}>{name}</label>
          <input type='text' placeholder={placeholder} id={name} name={name} value={value} onChange={handleChange} onBlur={() => setWasTouched(true)} className={classValidation} />
          {error && <p className={classes.alert}>{errorMessage || 'Valor inválido'}</p>}
    </div>
  )
})

const FormAddress = ({ compraFinalizada }) => {
  const regexCpf = /(?:\d{3}[.-]?){3}\d{2}/;

  const [cepErrorMessage, setCepErrorMessage] = useState(null)

  const {value: cep, isValid: cepIsValid, error: cepError, wasTouched: cepTouched, setValue: setCep, setWasTouched: setCepWasTouched} = useInput((value) => value.trim() !== '' && !cepErrorMessage);
  const {value: street, isValid: streetIsValid, error: streetError, setValue: setStreet, setWasTouched: setStreetWasTouched} = useInput((value) => value.trim() !== '');
  const {value: neighborhood, isValid: neighborhoodIsValid, error: neighborhoodError, setValue: setNeighborhood, setWasTouched: setNeighborhoodWasTouched} = useInput((value) => value.trim() !== '');
  const {value: num, isValid: numIsValid, error: numError, setValue: setNum,  setWasTouched: setNumWasTouched} = useInput((value) =>  value.trim() !== '');
  const {value: complemento, isValid: complementoIsValid, error: complementoError, setValue: setComplemento,  setWasTouched: setComplementoWasTouched} = useInput(() => true);
  const {value: nome, isValid: nomeIsValid, error: nomeError, setValue: setNome,  setWasTouched: setNomeWasTouched} = useInput((value) => value.trim() !== '');
  const {value: cpf, isValid: cpfIsValid, error: cpfError, setValue: setCpf,  setWasTouched: setCpfWasTouched} = useInput((value) => regexCpf.test(value));
 

  const cartState = useSelector(state => state.cart)

  const navigate = useNavigate();

  const dispatch = useDispatch()

   useEffect(() => {

    if (cepTouched) {
      const validateCep = async () => {

        let error;

        await fetch(`https://brasilapi.com.br/api/cep/v1/${cep}`)
          .then(r => r.json())
          .then(enderecoData => {
            if (enderecoData.city !== 'Araranguá') {
              error = 'Desculpe! No momento não atendemos essse CEP!'
              return;
            }
            setStreet(enderecoData.street);
            setNeighborhood(enderecoData.neighborhood)

          })
          .catch(err => {
            console.log(err)
          })
          setCepErrorMessage(error)
      }
      validateCep()
    }
  }, [cep, cepTouched, setNeighborhood, setStreet])


  const submitForm = (e) => {
    e.preventDefault();

    fetch('http://localhost/enviarCarrinho.php',{
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({
        nome: nome,
        cpf: cpf,
        cep: cep,
        rua: street,
        endereco: neighborhood,
        numero: num,
        complemento: complemento,
        formaPgto: 'pix'
      }),
    })
    .then(data => data.json())
    .then(data => console.log(data));

    // setCepWasTouched(true);
    // setStreetWasTouched(true);
    // setComplementoWasTouched(true);
    // setNeighborhoodWasTouched(true);
    // setNomeWasTouched(true);
    // setCpfWasTouched(true);
    // setNumWasTouched(true);

    // if (cepIsValid && streetIsValid && complementoIsValid && neighborhoodIsValid && nomeIsValid && cpfIsValid && numIsValid) {
    //   compraFinalizada()
    //   // fetch para o servidor
    //   navigate('/finalizado', { state: { nome, cartState } })
    // } else { 
    //   dispatch(alertVisibility('Preencha o formulário corretamente.', 'bad'));
    // }
  }

  return (
    <form onSubmit={submitForm} className={classes.form}>
      <InputField placeholder='Nome' name='nome' value={nome} isValid={nomeIsValid} error={nomeError} setValue={setNome} setWasTouched={setNomeWasTouched}/>
      <InputField placeholder='000.000.000-00' name='cpf' value={cpf} isValid={cpfIsValid} error={cpfError} setValue={setCpf} setWasTouched={setCpfWasTouched}/>
      <InputField placeholder='88905470' name='cep' value={cep} isValid={cepIsValid} error={cepError} setValue={setCep} setWasTouched={setCepWasTouched} errorMessage={cepErrorMessage}/>
      <InputField placeholder='Rua/Av' name='av/rua' value={street} isValid={streetIsValid} error={streetError} setValue={setStreet} setWasTouched={setStreetWasTouched}/>
      <InputField placeholder='Bairro ' name='endereco' value={neighborhood}  isValid={neighborhoodIsValid} error={neighborhoodError} setValue={setNeighborhood} setWasTouched={setNeighborhoodWasTouched}/>
      <InputField placeholder='000' name='numero' value={num} isValid={numIsValid} error={numError} setValue={setNum} setWasTouched={setNumWasTouched}/>
      <InputField placeholder='apt' name='complemento' value={complemento} isValid={complementoIsValid} error={complementoError} setValue={setComplemento} setWasTouched={setComplementoWasTouched}/>
      <div className={classes.formaPagamento}>
    <h2>Forma de Pagamento:</h2>
    <div>
        <input type="radio" id="cartao" name="formaPagamento" value="cartao" defaultChecked />
        <label htmlFor="cartao">
            <FontAwesomeIcon icon={faCreditCard} />
            Cartão
        </label>
    </div>
    <div>
        <input type="radio" id="pix" name="formaPagamento" value="pix" />
        <label htmlFor="pix">
            <FontAwesomeIcon icon={faMoneyCheck} />
            Pix
        </label>
    </div>
    <div>
        <input type="radio" id="dinheiro" name="formaPagamento" value="dinheiro" />
        <label htmlFor="dinheiro">
            <FontAwesomeIcon icon={faMoneyBill} />
            Dinheiro
        </label>
    </div>
</div>
      <button className='btn-style'>Finalizar compra</button>
    </form>
  )
}

export default FormAddress