import React, { useContext, useState } from 'react'

import './Compressor.css';

import TextFileContext from './context/textFileContext';
import Huffman from './huffman-algorithm/Huffman';


const Compressor = () => {
  const [binState, setBinState] = useState([]);
  const [encodedStr, setEncodedStr] = useState("");
  const [decodedStr, setDecodedStr] = useState("");
  const [showCompress, setShowCompress] = useState(false);
  const [showDecompress, setShowDecompress] = useState(false);
  const context = useContext(TextFileContext);

  const downloadCompressedTextFile = (encodedText, fileName) => {
    const aTag = document.createElement('a');
    const file = new Blob([encodedText], {
      type: 'text/plain;charset=utf-8'
    });

    aTag.href = URL.createObjectURL(file);
    aTag.download = `${fileName}.txt`;
    document.body.appendChild(aTag);
    aTag.click();
  }

  const onCompress = () => {
    if (context.length > 0) {
      const huffmanObj = new Huffman(context);
      const arr = huffmanObj.compress();
      const encoded = huffmanObj.getEncodedString();
      const decoded = huffmanObj.decodeEncodedString();
      setShowCompress(true);
      setBinState(arr);
      setEncodedStr(encoded);
      setDecodedStr(decoded);
      downloadCompressedTextFile(encoded, "encoded_huffman");
    } else {
      alert("Please Upload the text File");
    }
  }

  const onDeCompress = () => {
    if (encodedStr.length > 0) {
      setShowDecompress(true);
      downloadCompressedTextFile(decodedStr, "decoded_huffman");
    } else {
      alert("Please Upload the Text File");
    }
  }

  return (
    <div className='compress display-data'>
      <div>
        <span><strong>STEP 2 : </strong>Compress the File</span> <br />
        <input type='button' value='Compress the File' className='compress-btn' onClick={onCompress} />

        {showCompress && <><div className='display-data'>
          HUFFMAN ENCODED BINARY STRINGS 👇
          {binState.length > 0 ? binState.map((obj, idx) => {
            return <div key={idx}><span>{obj.char} : {obj.binStr}</span></div>
          }) : <div style={{ color: '#2CD3E1' }}>Choose a Text File to see the huffman code words</div>}
        </div>

          <div className='display-data'>
            Encoded String : {encodedStr.length > 0 ? encodedStr : <div style={{ color: '#2CD3E1' }}>Choose a Text File to see Encoded Binary String</div>}
          </div></>}
      </div>
      <div>
        <span><strong>STEP 3 : </strong>DeCompress the File</span> <br />
        <input type='button' value='DeCompress the File' className='compress-btn' onClick={onDeCompress} />
        {showDecompress && <div className='display-data'>
          Decoded String : {decodedStr.length > 0 ? decodedStr : <div style={{ color: '#2CD3E1' }}>Choose a Text File to see Encoded Binary String</div>}
        </div>}
      </div>
    </div>
  )
}

export default Compressor;