export const PresaleABI = [
  {
    type: 'constructor',
    name: '',
    inputs: [
      {
        type: 'address',
        name: 'COIN_PRICE_FEED_',
        internalType: 'contract AggregatorV3Interface',
      },
      {
        type: 'address',
        name: 'usdcToken_',
        internalType: 'contract IERC20',
      },
      {
        type: 'address',
        name: 'usdtToken_',
        internalType: 'contract IERC20',
      },
      {
        type: 'address',
        name: 'protocolWallet_',
        internalType: 'address',
      },
      {
        type: 'address',
        name: 'admin',
        internalType: 'address',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'error',
    name: 'EnforcedPause',
    inputs: [],
    outputs: [],
  },
  {
    type: 'error',
    name: 'ExpectedPause',
    inputs: [],
    outputs: [],
  },
  {
    type: 'error',
    name: 'OwnableInvalidOwner',
    inputs: [
      {
        type: 'address',
        name: 'owner',
        internalType: 'address',
      },
    ],
    outputs: [],
  },
  {
    type: 'error',
    name: 'OwnableUnauthorizedAccount',
    inputs: [
      {
        type: 'address',
        name: 'account',
        internalType: 'address',
      },
    ],
    outputs: [],
  },
  {
    type: 'error',
    name: 'SafeTransferFailed',
    inputs: [],
    outputs: [],
  },
  {
    type: 'error',
    name: 'SafeTransferFromFailed',
    inputs: [],
    outputs: [],
  },
  {
    type: 'event',
    name: 'OwnershipTransferred',
    inputs: [
      {
        type: 'address',
        name: 'previousOwner',
        indexed: true,
        internalType: 'address',
      },
      {
        type: 'address',
        name: 'newOwner',
        indexed: true,
        internalType: 'address',
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'Paused',
    inputs: [
      {
        type: 'address',
        name: 'account',
        indexed: false,
        internalType: 'address',
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'StageUpdated',
    inputs: [
      {
        type: 'uint256',
        name: 'currentStage',
        indexed: false,
        internalType: 'uint256',
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'TokensBought',
    inputs: [
      {
        type: 'address',
        name: 'token',
        indexed: true,
        internalType: 'address',
      },
      {
        type: 'address',
        name: 'user',
        indexed: true,
        internalType: 'address',
      },
      {
        type: 'address',
        name: 'referrer',
        indexed: true,
        internalType: 'address',
      },
      {
        type: 'uint256',
        name: 'amount',
        indexed: false,
        internalType: 'uint256',
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'Unpaused',
    inputs: [
      {
        type: 'address',
        name: 'account',
        indexed: false,
        internalType: 'address',
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: 'function',
    name: 'COIN_DECIMALS',
    inputs: [],
    outputs: [
      {
        type: 'uint8',
        name: '',
        internalType: 'uint8',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'COIN_PRICE_FEED',
    inputs: [],
    outputs: [
      {
        type: 'address',
        name: '',
        internalType: 'contract AggregatorV3Interface',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'PRICEFEED_DECIMALS',
    inputs: [],
    outputs: [
      {
        type: 'uint8',
        name: '',
        internalType: 'uint8',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'STABLETOKEN_PRICE',
    inputs: [],
    outputs: [
      {
        type: 'int32',
        name: '',
        internalType: 'int32',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'STABLE_TOKEN_DECIMALS',
    inputs: [],
    outputs: [
      {
        type: 'uint8',
        name: '',
        internalType: 'uint8',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'balances',
    inputs: [
      {
        type: 'address',
        name: 'user',
        internalType: 'address',
      },
    ],
    outputs: [
      {
        type: 'uint256',
        name: 'balance',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'depositCoin',
    inputs: [
      {
        type: 'address',
        name: 'referrer',
        internalType: 'address',
      },
    ],
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    name: 'depositCoinTo',
    inputs: [
      {
        type: 'address',
        name: 'to',
        internalType: 'address',
      },
      {
        type: 'address',
        name: 'referrer',
        internalType: 'address',
      },
    ],
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    name: 'depositUSDC',
    inputs: [
      {
        type: 'uint256',
        name: 'amount',
        internalType: 'uint256',
      },
      {
        type: 'address',
        name: 'referrer',
        internalType: 'address',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'depositUSDCTo',
    inputs: [
      {
        type: 'address',
        name: 'to',
        internalType: 'address',
      },
      {
        type: 'uint256',
        name: 'amount',
        internalType: 'uint256',
      },
      {
        type: 'address',
        name: 'referrer',
        internalType: 'address',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'depositUSDT',
    inputs: [
      {
        type: 'uint256',
        name: 'amount',
        internalType: 'uint256',
      },
      {
        type: 'address',
        name: 'referrer',
        internalType: 'address',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'depositUSDB',
    inputs: [
      {
        type: 'uint256',
        name: 'amount',
        internalType: 'uint256',
      },
      {
        type: 'address',
        name: 'referrer',
        internalType: 'address',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'depositUSDBTo',
    inputs: [
      {
        type: 'address',
        name: 'to',
        internalType: 'address',
      },
      {
        type: 'uint256',
        name: 'amount',
        internalType: 'uint256',
      },
      {
        type: 'address',
        name: 'referrer',
        internalType: 'address',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'depositUSDTTo',
    inputs: [
      {
        type: 'address',
        name: 'to',
        internalType: 'address',
      },
      {
        type: 'uint256',
        name: 'amount',
        internalType: 'uint256',
      },
      {
        type: 'address',
        name: 'referrer',
        internalType: 'address',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'owner',
    inputs: [],
    outputs: [
      {
        type: 'address',
        name: '',
        internalType: 'address',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'pause',
    inputs: [],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'paused',
    inputs: [],
    outputs: [
      {
        type: 'bool',
        name: '',
        internalType: 'bool',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'protocolWallet',
    inputs: [],
    outputs: [
      {
        type: 'address',
        name: '',
        internalType: 'address',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'renounceOwnership',
    inputs: [],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'setStage',
    inputs: [
      {
        type: 'uint256',
        name: 'stageIterator_',
        internalType: 'uint256',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'stageIterator',
    inputs: [],
    outputs: [
      {
        type: 'uint256',
        name: '',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'stages',
    inputs: [
      {
        type: 'uint256',
        name: '',
        internalType: 'uint256',
      },
    ],
    outputs: [
      {
        type: 'uint96',
        name: 'cost',
        internalType: 'uint96',
      },
      {
        type: 'uint160',
        name: 'amount',
        internalType: 'uint160',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'totalSoldInUSD',
    inputs: [],
    outputs: [
      {
        type: 'uint256',
        name: '',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'totalTokensSold',
    inputs: [],
    outputs: [
      {
        type: 'uint256',
        name: '',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'transferOwnership',
    inputs: [
      {
        type: 'address',
        name: 'newOwner',
        internalType: 'address',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'unpause',
    inputs: [],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'updateProtocolWallet',
    inputs: [
      {
        type: 'address',
        name: 'wallet',
        internalType: 'address',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'updateTotalSold',
    inputs: [
      {
        type: 'uint256',
        name: 'amount',
        internalType: 'uint256',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'usdcToken',
    inputs: [],
    outputs: [
      {
        type: 'address',
        name: '',
        internalType: 'contract IERC20',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'usdtToken',
    inputs: [],
    outputs: [
      {
        type: 'address',
        name: '',
        internalType: 'contract IERC20',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'usdbToken',
    inputs: [],
    outputs: [
      {
        type: 'address',
        name: '',
        internalType: 'contract IERC20',
      },
    ],
    stateMutability: 'view',
  },
] as const;
