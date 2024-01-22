import React from 'react'
import Paciente from './Paciente'

export default function ListadoPacientes({ pacientes, setPaciente, eliminarPaciente }) {

  return (
    <div className='md:w-1/2 lg:w-3/5 '>
      <h2 className='font-black text-3xl text-center'>Listado de pacientes</h2>
      <p className='texat-xl mt-5 mb-10 text-center'>
        Administra tus {''}
        <span className='text-indigo-600 font-bold'>Pacientes y Citas</span>
      </p>

      <div className='md:h-screen overflow-y-scroll no-scrollbar'>

        {pacientes && pacientes.length ? (
          pacientes.map(paciente => (
            <Paciente
              key={paciente.id}
              paciente={paciente}
              setPaciente = {setPaciente}
              eliminarPaciente = {eliminarPaciente}
            />
          ))
        ) : (
          <h2 className='font-black text-2xl text-center mb-10'>No hay pacientes</h2>
        )}

      </div>

    </div>
  )
}

