import './Qrcode.css'
import React, { useState } from 'react'
import Qrcodeimg from '../Images/qrcode.png';
import lizardimg from '../Images/lizard.png';



export const Qrcode = () => {

    const [image , setImage] = useState('')
    const [loading ,setLoading] =useState(false);
    const [qrData , setQrdata] = useState("");
    const [qrSize , setQrsize] =useState('');

 async function Generator(){
   
    setLoading(true)

     try {
        const url = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${qrData}`;
        setImage(url)
     } catch (error) {
        console.log("ERROR while generating QR code " ,error);
     }finally{
        setLoading(false)     }


  } 
  function DownloadQR(){

    fetch(image)
    .then((Response)=> Response.blob())
    .then((blob)=>{
      const link = document.createElement('a');
      link.href=URL.createObjectURL(blob);
      link.target='_blank'
     document.body.appendChild(link)
     link.click();
     document.body.removeChild(link)
    })
    .catch((error)=>{
      console.log('error while downloading the QR code',error);
    })

  }



  return (
    <div className='app-container'>

        <h1>QR CODE GENERATOR</h1>
        {loading && <p>please wait..</p>}
        {image &&  <img src={image}/> }
       
      <div >
        <label className='input-label' htmlFor='dataInput'>Data for QR Code</label>

        <input type='text' id='dataInput' placeholder='Enter Data for QR code' value={qrData} onChange={(e)=>{setQrdata(e.target.value)}}/> <br/>

        <label className='input-label' htmlFor='sizeInput'>Image Size (e.g., 150)</label> 
        <input type='text' id='sizeInput' placeholder='Enter Image Size' value={qrSize} onChange={(e)=>{setQrsize(e.target.value)}}/>
        <br/>
        <button className='generateButton' disabled={loading} onClick={()=> Generator()}>Generate QR code</button>
        <button className='downloadButton' onClick={()=>{DownloadQR()}}>Download QR code</button>

      </div>
      <p>Designed By Deva</p>
    </div>
  )
}
