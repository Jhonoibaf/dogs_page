import React from 'react';


export default function Paginado({dogsForPage, allDogs, paginado}){

  const pageNumbers = [];

  for(let i = 0; i<Math.ceil(allDogs/dogsForPage);i++ ){
    pageNumbers.push(i+1)
  }

  return (
    <nav>
      <ul >
        {
          pageNumbers?.map(num => (
            <li key={num}>
              <a herf="#"  onClick={()=> paginado(num)}>{num}</a>
            </li>
          ))
        }
      </ul>
    </nav>
  )
}
