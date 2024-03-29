import React from 'react'
import { useState, useEffect } from 'react'

import Error from './Error'

export default function Formulario({ pacientes, setPacientes, paciente, setPaciente }) {

  const [nombre, setNombre] = useState('')
  const [propietario, setPropietario] = useState('')
  const [email, setEmail] = useState('')
  const [fecha, setFecha] = useState('')
  const [sintomas, setSintomas] = useState('')

  const [error, setError] = useState(false)

  useEffect(() => {
    if (Object.keys(paciente).length > 0) {
      setNombre(paciente.nombre)
      setPropietario(paciente.propietario)
      setEmail(paciente.email)
      setFecha(paciente.fecha)
      setSintomas(paciente.sintomas)
    }
  }, [paciente])

  const idGenerator = () => {
    const random = Math.random().toString(36).substr(2)
    const fecha = Date.now().toString(36)

    return random + fecha
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    //validacion del formulario

    if ([nombre, propietario, email, fecha, sintomas].includes('')) {
      console.log('Hay al menos un campo vacio')

      setError(true)
      return;
    }

    setError(false)

    //Objeto de paceinte
    const pacienteObj = {
      nombre,
      propietario,
      email,
      fecha,
      sintomas
    }

    if (paciente.id) {
      //editando registro

      pacienteObj.id = paciente.id
      const pacientesActualizados = pacientes.map( pacienteState => pacienteState.id === paciente.id ? pacienteObj : pacienteState)
      setPacientes(pacientesActualizados)
      setPaciente({})
    } else {
      //nuevo registro

      pacienteObj.id = idGenerator()
      setPacientes([...pacientes, pacienteObj])
    }

    //reiniciar el form
    setNombre('')
    setPropietario('')
    setEmail('')
    setFecha('')
    setSintomas('')
  }

  return (
    <div className='md:w-1/2 lg:w-2/5 mx-5'>
      <h2 className='font-black text-3xl text-center'>Seguimiento Pacientes</h2>

      <p className='text-lg mt-5 text-center mb-10'>
        Añade Pacientes y {''}
        <span className='text-indigo-600 font-bold text-lg'>Administrales</span>
      </p>

      <form onSubmit={handleSubmit} action="" className='bg-white shadow-md rounded-lg py-10 px-5 mb-10'>
        {error && <Error><p>Todos los campos son obligatorios</p></Error>}
        <div className='mb-5'>
          <label htmlFor="mascotaName" className='block text-gray-700 uppercase font-bold'>Nombre Mascota</label>
          <input
            id='mascotaName'
            type="text"
            placeholder='Nombre de la mascota'
            className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>

        <div className='mb-5'>
          <label htmlFor="ownerName" className='block text-gray-700 uppercase font-bold'>Nombre Propietario</label>
          <input
            id='ownerName'
            type="text"
            placeholder='Nombre del propietario'
            className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
            value={propietario}
            onChange={(e) => setPropietario(e.target.value)}
          />
        </div>

        <div className='mb-5'>
          <label htmlFor="email" className='block text-gray-700 uppercase font-bold'>Email</label>
          <input
            id='email'
            type="email"
            placeholder='Email Contacto Propietario'
            className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className='mb-5'>
          <label htmlFor="alta" className='block text-gray-700 uppercase font-bold'>Alta</label>
          <input
            id='alta'
            type="date"
            className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
          />
        </div>

        <div className='mb-5'>
          <label htmlFor="sintomas" className='block text-gray-700 uppercase font-bold'>Sintomas</label>
          <textarea
            id="sintomas"
            className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
            placeholder='Describe los sintomas'
            value={sintomas}
            onChange={(e) => setSintomas(e.target.value)}
          />
        </div>

        <input
          type="submit"
          className='bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors'
          value={paciente.id ? 'Editar paciente' : 'Agregar Paciente'}
        />
      </form>

    </div>
  )
}
