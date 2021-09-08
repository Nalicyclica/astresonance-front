import React, {useState, useEffect, useContext} from "react";
import {MusicLoading} from './MusicShow'
import { useTitleDelete } from "../functions/DeleteTitle";
import ConfirmAction, { ConfirmActionInfo, defaultConfirmAction } from "./ConfirmAction";

const TitleDelete: React.FC<{titleId: number}> = ({titleId}) => {
  const [deleteResponse, titleDelete] = useTitleDelete();
  const [actionConfirm, setConfirmAction] = useState<ConfirmActionInfo>(defaultConfirmAction)
  const setMusicLoading = useContext(MusicLoading);
  const confirmMessage: string = "タイトルを削除"
  
  const handleClickDelete = () => {
    const confirmShowData: ConfirmActionInfo = {
      modalShow: true,
      response: false
    };
    setConfirmAction(confirmShowData);
  };

  useEffect(() => {
    if(actionConfirm.response){
    titleDelete(titleId);
    }
  }, [actionConfirm]);

  useEffect(() => {
    if(deleteResponse.valid){
      setMusicLoading(true);
    }else{
      if(deleteResponse.id > 0){
        alert("削除できませんでした");
      }
    }
  }, [deleteResponse]);

  return(
    <div>
      <button onClick={handleClickDelete}>
        タイトルを削除する
      </button>
      {actionConfirm.modalShow && <ConfirmAction setConfirmAction={setConfirmAction} message={confirmMessage} />}
    </div>
  );
};

export default TitleDelete