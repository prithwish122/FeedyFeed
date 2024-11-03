// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract NotesContract {
    struct Note {
        uint id;
        string content;
        address owner;
    }

    Note[] public notes;
    mapping(uint => address) public noteToOwner;
    uint public nextNoteId;

    event NoteCreated(uint id, string content, address owner);

    function createNote(string memory _content) public {
        notes.push(Note({
            id: nextNoteId,
            content: _content,
            owner: msg.sender
        }));
        noteToOwner[nextNoteId] = msg.sender;
        emit NoteCreated(nextNoteId, _content, msg.sender);
        nextNoteId++;
    }

    function getNotes() public view returns (Note[] memory) {
        return notes;
    }

    function getNoteOwner(uint _id) public view returns (address) {
        return noteToOwner[_id];
    }
}
