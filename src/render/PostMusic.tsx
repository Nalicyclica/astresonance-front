import React, {useState, useCallback} from 'react';
import {useDropzone} from 'react-dropzone'

const PostMusic: React.FC = () => {
  const [ filePath, setPath ] = useState("")
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file: Blob) => {
      const reader = new FileReader()

      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = () => {
      // Do whatever you want with the file contents
        const binaryStr = reader.result
        console.log(binaryStr)
      }
      reader.readAsArrayBuffer(file)
    })
    
  }, [])
  const {getRootProps, getInputProps} = useDropzone({ onDrop });
	return (
    <div className="flex-grow bg-gray-900">
      <form onSubmit={hoge => hoge} className="flex flex-col justify-start items-center">
        <h1 className="text-2xl mt-8 mb-6">Please post your music</h1>
        <div className="mb-4">
          <div {...getRootProps()} className="flex justify-center items-center w-96 h-48 bg-gray-300 text-black rounded-md shadow-bright hover:shadow-gold hover:bg-gray-100">
            <input {...getInputProps()} />
                {/* <div className="text-center">
                <p>Drag 'n' drop a mp3/ogg files</p>
                <p>or</p>
                <p>Click here</p>
                </div> */}
                <p>Drag 'n' drop a mp3/ogg files</p>
          </div>
        </div>
        <label className="my-2">
          <p>Songs/Melodies:</p>
          <select onChange={hoge => hoge} className="my-2 p-2 w-48 bg-gray-900 border-b border-yellow-300 focus:outline-none hover:bg-gray-700">
            <option>hoge</option>
            <option>hoge</option>
            <option>hoge</option>
            <option>hoge</option>
          </select>
        </label>
        <label className="my-2">
          <p>Genre:</p>
          <select onChange={hoge => hoge} className="my-2 p-2 w-48 bg-gray-900 border-b border-yellow-300 focus:outline-none hover:bg-gray-700">
            <option>hoge</option>
            <option>hoge</option>
            <option>hoge</option>
            <option>hoge</option>
          </select>
        </label>
        <input type="submit" value="Post music" className="text-xl my-4 px-5 py-3 bg-gray-900 rounded-md shadow-bright hover:shadow-gold"/>
      </form>
    </div>
	);
}

export default PostMusic