
import { useState } from 'react';
import { AiOutlineCaretDown, AiOutlineCaretUp} from 'react-icons/ai'


type DropdownProp={
    items:string[];
    roleSelectHandler: (e:string) => void
}


const RoleDropDown = (props: DropdownProp) => {

    const [isOpen, setIsOpen]=useState(false);
    const [select, setSelect]=useState("Select");

    const handleClick=(item:string)=>{
            setIsOpen((prev)=>!prev)
            props.roleSelectHandler(item)
            setSelect(item);
    }


    return (
            <div className='relative w-50 h-6 rounded-lg '>
                <button 
                    onClick={()=>setIsOpen((prev)=>!prev)}
                    className='bg-blue-400 p4 w-[100px] flex text-center items-center justify-between font-bold text-lg rounded-lg tracking-wider border-4 border-transparent active:border-white duration-300 active:text-white pl-1'>
                    {select} {!isOpen ? (
                        <AiOutlineCaretDown className='h-4'></AiOutlineCaretDown>
                        ) : (<AiOutlineCaretUp className='h-4'></AiOutlineCaretUp>
                        )}
                </button>
                {
                    isOpen && (
                        <div className='bg-blue-400 top-10 absolute flex-col items-start rounded-lg p-2 w-full'>
                        {props.items.map((item,i)=>(
                            <div className='flex w-full m-1 justify-between hover:bg-blue-300 cursor-pointer rounded-r-lg border-l-transparent hover:border-l-white border-l-4' key={i}>
                                <h3 onClick={() => handleClick(item)}>{item}</h3>
                            </div>
                        ))}
                    </div>

                    )
                }
               


            </div>

    );
};

export default RoleDropDown;
