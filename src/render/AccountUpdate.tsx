import React, { useState, useEffect } from 'react';
import { useAccountUpdate } from '../functions/UpdateAccount';
import { IconUpdateForm, EmailUpdateForm, PasswordUpdateForm, IntroduceUpdateForm } from './AccountUpdateForm';

const AccountUpdate: React.FC = () => {
  const [accountItem, {getAccount, updateAccount}] = useAccountUpdate();
  const [iconFormShow, setIconShow] = useState<boolean>(false);
  const [emailFormShow, setEmailShow] = useState<boolean>(false);
  const [passwordFormShow, setPasswordShow] = useState<boolean>(false);
  const [introduceFormShow, setIntroduceShow] = useState<boolean>(false);

  useEffect(() => {
    getAccount();
  },[]);

  useEffect(() => {
    if(accountItem.response.valid){
      setIconShow(false);
      setEmailShow(false);
      setPasswordShow(false);
      setIntroduceShow(false);
    }else{
      if(accountItem.response.errors.errors){
        alert("入力した情報が正しくありません");
      }
    }
  },[accountItem]);

  const popUpIconForm = () => {
    setIconShow(true);
  };

  const popUpEmailForm = () => {
    setEmailShow(true);
  };

  const popUpPasswordForm = () => {
    setPasswordShow(true);
  };

  const popUpIntroduceForm = () => {
    setIntroduceShow(true);
  };

  return (
    <div className="inline-flex backdrop-filter backdrop-blur w-screen h-screen overflow-auto">
      <div className="flex flex-col items-center w-screen">
        <h1 className="w-120 text-center text-2xl mt-8 mb-6 px- py-2 text-yellow-400 border-b border-yellow-300">ユーザー情報の確認</h1>
        <div className="w-96">
          <div className="flex w-full justify-between items-end p-2 border-b border-yellow-300">
            <div className="" >
              <p className="m-2">Nickname:</p>
              <p className="text-2xl mx-4 mb-2">{accountItem.nickname}</p>
            </div>
            <button  onClick={popUpIconForm} style={{backgroundColor: accountItem.icon_color}} className="w-16 h-16 rounded-full shadow-bright hover:shadow-gold">
            </button>
          </div>
          <div className="flex w-full justify-between items-end p-2 border-b border-yellow-300">
            <div className="" >
              <p className="m-2">E-mail:</p>
              <p className="text-xl mx-4 mb-2">{accountItem.email}</p>
            </div>
            <button  onClick={popUpEmailForm} className="ml-10 my-2 px-5 py-2 bg-gray-900 rounded-md shadow-bright hover:shadow-gold">
              変更
            </button>
          </div>
          <div className="flex w-full justify-between items-end p-2 border-b border-yellow-300">
            <div className="" >
              <p className="m-2">Password:</p>
              <p className="text-xl mx-4 mb-2">********</p>
            </div>
            <button  onClick={popUpPasswordForm} className="ml-10 my-2 px-5 py-2 bg-gray-900 rounded-md shadow-bright hover:shadow-gold">
              変更
            </button>
          </div>
          <div className="flex justify-between items-center p-2 border-b border-yellow-300">
            <div className="" >
              <p className="m-2">自己紹介:</p>
              <p className="w-full text-lg mx-4 mb-2">{accountItem.introduce}</p>
            </div>
            <button  onClick={popUpIntroduceForm} className="ml-10 my-2 px-5 py-2 bg-gray-900 rounded-md shadow-bright hover:shadow-gold">
              変更
            </button>
          </div>
        </div>
      </div>
      {iconFormShow && <IconUpdateForm icon_color={accountItem.icon_color} updateAccount={updateAccount} setFormShow={setIconShow} />}
      {emailFormShow && <EmailUpdateForm email={accountItem.email} updateAccount={updateAccount} setFormShow={setEmailShow} />}
      {passwordFormShow && <PasswordUpdateForm updateAccount={updateAccount} setFormShow={setPasswordShow} />}
      {introduceFormShow && <IntroduceUpdateForm introduce={accountItem.introduce} updateAccount={updateAccount} setFormShow={setIntroduceShow} />}
    </div>
	);
}

export default AccountUpdate