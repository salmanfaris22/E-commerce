import R1 from '../../../Assets/R1.svg'
import R2 from '../../../Assets/r2.svg'
import R3 from '../../../Assets/r3.svg'
import Rmain from '../../../Assets/Rmain.jpg'

const Garendy = () => {
  return (
    <div className="grid md:grid-cols-2 p-3">
     <div className='p-4 flex flex-col gap-5 font-thin text-stone-700 justify-center items-center'>
     Eu eget felis erat mauris aliquam mattis lacus, arcu leo aliquam 
     sapien pulvinar laoreet vulputate sem aliquet phasellus egestas felis, 
     est, vulputate morbi massa mauris vestibulum dui odio.

     <div className='grid grid-cols-3 gap-10'> 
        <img src={R1} alt="" />
        <img src={R2} alt="" />
        <img src={R3} alt="" />
     </div>
     </div>
     <div className='flex justify-center items-center'>
        <img src={Rmain} alt=""  className=' rounded-full p-2'/>
     </div>
    </div>
  )
}

export default Garendy
