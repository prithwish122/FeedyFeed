"use client";
import { useState } from 'react';
import { useWeb3 } from '../hooks/useWeb3';
import { ethers,BrowserProvider } from 'ethers';
import contractABI from "../abi/contractABI.json"


export default function NoteForm() {
    const { contract, account } = useWeb3();
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if Web3 is connected
        // if (!account || !contract) {
        //     alert("Please connect to your wallet.");
        //     return;
        // }

        setLoading(true);
        // try {
            const provider = new BrowserProvider(window.ethereum);
            await provider.send("eth_requestAccounts", []); 
            const signer = provider.getSigner();
            const contract = new ethers.Contract("0xD19e3D3A2753f5f869C8C6522a21802b957259bc", contractABI, signer);


            console.log(contractABI)
            const createNodeTxHash = await (await contract.createNote("pruth", "lol")).wait();

            // const transaction = await contract.createNote(content); // Send the transaction
            // const receipt = await transaction.wait(); // Wait for confirmation
            // console.log("Note created successfully:", receipt);


            // Wait for confirmation
            // console.log("Note created successfully:", receipt);
            // console.log(content, account, "================")
            // await (await contract.methods.createNote(content).send({ from: account })).wait();
            // Specify gasPrice for non-EIP-1559 networks
            setContent(''); // Clear the input field after submission
            alert('Note created!');
    
        // } catch (error) {
        //     console.error("Error creating note:", error);
        //     alert('Failed to create note.');
        // } finally {
        //     setLoading(false);
        // }
    };

    return (
        <form onSubmit={handleSubmit} className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Add a feedback</h2>
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your note..."
                className="border text-black border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                rows="4"
                disabled={loading} // Disable textarea while loading
            />
            <button
                type="submit"
                disabled={loading} // Disable button while loading
                className={`mt-4 w-full p-3 rounded-lg shadow-md focus:outline-none transition duration-150 ease-in-out ${loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600 text-white'
                    }`}
            >
                {loading ? 'Sending...' : 'Send'}
            </button>
        </form>
    );
}
