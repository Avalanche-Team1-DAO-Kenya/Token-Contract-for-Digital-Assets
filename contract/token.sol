// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0

pragma solidity ^0.8.22;

import {ERC20} from "@openzeppelin/contracts@5.1.0/token/ERC20/ERC20.sol";
import {ERC20Permit} from "@openzeppelin/contracts@5.1.0/token/ERC20/extensions/ERC20Permit.sol";
import {Ownable} from "@openzeppelin/contracts@5.1.0/access/Ownable.sol";

contract Dalas is ERC20, ERC20Permit, Ownable {
    struct User {
        bool hasJoined;
        bool hasClaimed;
        string referralCode;
        uint256 referrals;
    }

    uint256 public constant initialSupply = 1_000_000 * 10 ** 18;

    mapping(address => User) public users;
    mapping(string => address) public codeToAddress;

    event TokensMinted(address indexed to, uint256 amount);
    event TransferWithMemo(address indexed from, address indexed to, uint256 amount, string memo);

    constructor(address initialOwner)
        ERC20("Dalas", "DKL")
        Ownable(initialOwner)
        ERC20Permit("Dalas")
    {
        _mint(initialOwner, initialSupply * 10 ** decimals());
        emit Transfer(address(0), initialOwner, initialSupply * 10 ** decimals());
    }

    // Admin function to add a new community member
    function addCommunityMember(
        address userAddress,
        string calldata referralCodeUsed
    ) external onlyOwner {
        User storage user = users[userAddress];
        require(!user.hasJoined, "User already in community");

        user.hasJoined = true;
        _mintTokens(userAddress, 10 * 10 ** decimals());

        // Process referral if valid
        if (bytes(referralCodeUsed).length > 0) {
            address referrer = codeToAddress[referralCodeUsed];
            if (referrer != address(0) && referrer != userAddress) {
                _mintTokens(referrer, 5 * 10 ** decimals());
                users[referrer].referrals++;
            }
        }

        // Generate unique referral code
        string memory newCode = _generateReferralCode(userAddress);
        user.referralCode = newCode;
        codeToAddress[newCode] = userAddress;
    }

    // Mint new tokens
    function mint(address to, uint256 amount) public onlyOwner {
        _mintTokens(to, amount);
    }

    // Enhance transfer function with memo capability
    function transferWithMemo(
        address recipient,
        uint256 amount,
        string calldata memo
    ) external returns (bool) {
        _transfer(_msgSender(), recipient, amount);
        emit TransferWithMemo(_msgSender(), recipient, amount, memo);
        return true;
    }

    // Get comprehensive user info
    function getUserInfo(address user) external view returns (
        bool hasJoined,
        uint256 balance,
        uint256 referrals,
        string memory referralCode
    ) {
        User storage u = users[user];
        return (
            u.hasJoined,
            balanceOf(user),
            u.referrals,
            u.referralCode
        );
    }

    // Internal mint function
    function _mintTokens(address to, uint256 amount) internal {
        _mint(to, amount);
        emit TokensMinted(to, amount);
    }

    // Override _transfer to track sender
    address public sender;
    function _update(
        address from,
        address to,
        uint256 amount
    ) internal override {
        sender = from;
        super._update(from, to, amount);
    }

    // Helper function to generate referral code
    function _generateReferralCode(address _user) internal pure returns (string memory) {
        return string(abi.encodePacked("REF-", _addressToString(_user)));
    }

    function _addressToString(address _addr) private pure returns (string memory) {
        bytes32 value = bytes32(uint256(uint160(_addr)));
        bytes memory alphabet = "0123456789abcdef";

        bytes memory str = new bytes(42);
        str[0] = "0";
        str[1] = "x";
        for (uint i = 0; i < 20; i++) {
            str[2 + i * 2] = alphabet[uint8(value[i + 12] >> 4)];
            str[3 + i * 2] = alphabet[uint8(value[i + 12] & 0x0f)];
        }
        return string(str);
    }
}
