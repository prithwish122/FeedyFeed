"use client";
import { useState, useEffect } from 'react';
import { useWeb3 } from './hooks/useWeb3';
import NoteForm from './components/NoteForm';

export default function Home() {
    const { contract } = useWeb3();
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        const fetchNotes = async () => {
            if (contract) {
                const notes = await contract.methods.getNotes().call();
                setNotes(notes);
            }
        };
        fetchNotes();
    }, [contract]);

    return (
        <div className="relative min-h-screen">
            {/* Background GIF */}
            <div
                className="absolute inset-0 -z-10 bg-cover bg-center"
                style={{ backgroundImage: 'url(https://gifdb.com/images/high/zoom-background-cherry-blossom-cartoon-2qekpcjpvcd9xwvw.gif)' }}
            ></div>

            {/* Main Content */}
            <div className="relative flex flex-col items-center p-6 min-h-screen bg-opacity-80">
            <h1 className="text-4xl font-extrabold text-dark-red mb-8 font-serif tracking-tight shadow-lg leading-tight">
  EDU-FEED
</h1>


                <NoteForm />
                <div className="mt-8 w-full max-w-4xl">
                    {notes.length > 0 ? (
                        notes.map((note) => (
                            <div key={note.id} className="bg-white border rounded-lg shadow-xl p-6 mb-6 transition-transform transform hover:scale-105 hover:shadow-2xl">
                                <p className="text-xl font-semibold text-gray-900">{note.content}</p>
                                <small className="text-sm text-gray-700">Owner: {note.owner}</small>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-700 text-center">No notes available.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
