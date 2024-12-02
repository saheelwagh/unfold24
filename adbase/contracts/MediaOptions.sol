// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MediaOptions {
    struct Media {
        string name;
        string category;
        uint256 price;
        uint256 reach;
    }

    Media[] public mediaList;

    event MediaAdded(string name, string category, uint256 price, uint256 reach);

    // Add a new media option
    function addMedia(
        string memory _name,
        string memory _category,
        uint256 _price,
        uint256 _reach
    ) public {
        mediaList.push(Media(_name, _category, _price, _reach));
        emit MediaAdded(_name, _category, _price, _reach);
    }

    // Get the total number of media options
    function getMediaCount() public view returns (uint256) {
        return mediaList.length;
    }

    // Retrieve all media options
    function getMediaList() public view returns (Media[] memory) {
        return mediaList;
    }
}
