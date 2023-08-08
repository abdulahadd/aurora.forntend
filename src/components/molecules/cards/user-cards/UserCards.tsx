import React from 'react'

interface CardProps {
    title: string;
    description: string;
    imageUrl: string;
  }

function UserCards(props: CardProps) {


  return (
    <div className="max-w-xs rounded overflow-hidden shadow-lg bg-white">
      <img className="w-full h-48 object-cover" src={props.imageUrl} alt={props.title} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{props. title}</div>
        <p className="text-gray-700 text-base">{props.description}</p>
      </div>
    </div>
  )
}

export default UserCards