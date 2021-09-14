import React, {useState, useEffect, useContext} from "react";
import {MusicLoading} from './MusicShow'
import { useTitleDelete } from "../functions/DeleteTitle";
import ConfirmAction, { ConfirmActionInfo, defaultConfirmAction } from "./ConfirmAction";
import LoadingNow from "./LoadingNow";

const TitleDelete: React.FC<{titleId: number}> = ({titleId}) => {
  const [{id, loading, result}, titleDelete] = useTitleDelete();
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
    if(result.valid){
      setMusicLoading(true);
    }else{
      if(result.action != ""){
        alert("削除できませんでした");
      }
    }
  }, [result]);

  return(
    <div>
      <button onClick={handleClickDelete}>
        タイトルを削除する
      </button>
      {actionConfirm.modalShow && <ConfirmAction setConfirmAction={setConfirmAction} message={confirmMessage} />}
      { loading && <LoadingNow />}
    </div>
  );
};

export default TitleDelete