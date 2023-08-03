
import { useState } from 'react';
import { AiOutlineCaretDown, AiOutlineCaretUp} from 'react-icons/ai'


type DropdownProp={
    items:string[];
    SelectHandler: (item: string,  key:string) => void
    fieldType:string;
    select:string;
    setSelect: (item:string)=>void
}


const DropDown = (props: DropdownProp) => {

    const [isOpen, setIsOpen]=useState(false);

    const handleClick=(e:any,item:string)=>{
            e.preventDefault()
            setIsOpen((prev)=>!prev)
            props.setSelect(item);
            props.SelectHandler(item, props.fieldType)
            
    }


    return (
            <div className='relative w-full pt-2 h-6 rounded-lg '>
                <button 
                type='button'
                    onClick={()=>setIsOpen((prev)=>!prev)}
                    className='bg-blue-100 mb-2 relative p4 w-full flex text-center items-center justify-between font-bold text-lg rounded-lg tracking-wider border-4 border-transparent active:border-white px-1 duration-300 active:text-white pl-1'>
                    {props.select} {!isOpen ? (
                        <AiOutlineCaretDown className='h-4'></AiOutlineCaretDown>
                        ) : (<AiOutlineCaretUp className='h-4'></AiOutlineCaretUp>
                        )}
                </button>
                {isOpen && (
                        <div className='bg-blue-400 top-15 absolute flex-col items-start z-10 rounded-lg p-2 w-full'>
                        {props.items.map((item,i)=>(
                            <div onClick={(e) => handleClick(e,item)} className='flex w-full justify-between hover:bg-blue-300 cursor-pointer rounded-r-lg border-l-transparent hover:border-l-white border-l-4' key={i}>
                                <h3>{item}</h3>
                            </div>
                        ))}
                    </div>

                    )
                }
               


            </div>

    );
};

export default DropDown;
