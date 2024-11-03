// hooks/useWeb3.js
"use client"
import { useState, useEffect } from 'react';
import Web3 from 'web3';
import NotesContractABI from '../abi/contractABI.json'; // ABI file

const contractAddress = '0xD19e3D3A2753f5f869C8C6522a21802b957259bc';

export function useWeb3() {
    const [web3, setWeb3] = useState(null);
    const [account, setAccount] = useState(null);
    const [contract, setContract] = useState(null);

    useEffect(() => {
        const initWeb3 = async () => {
            if (window.ethereum) {
                const web3 = new Web3(window.ethereum);
                setWeb3(web3);

                const accounts = await web3.eth.getAccounts();
                setAccount(accounts[0]);

                const contract = new web3.eth.Contract(NotesContractABI, contractAddress);
                setContract(contract);
            } else {
                alert('Please install MetaMask!');
            }
        };
        initWeb3();
    }, []);

    return { web3, account, contract };
}
