import BigNumber from 'bignumber.js/bignumber'

export const SUBTRACT_GAS_LIMIT = 100000

const ONE_MINUTE_IN_SECONDS = new BigNumber(60)
const ONE_HOUR_IN_SECONDS = ONE_MINUTE_IN_SECONDS.times(60)
const ONE_DAY_IN_SECONDS = ONE_HOUR_IN_SECONDS.times(24)
const ONE_YEAR_IN_SECONDS = ONE_DAY_IN_SECONDS.times(365)

export const INTEGERS = {
  ONE_MINUTE_IN_SECONDS,
  ONE_HOUR_IN_SECONDS,
  ONE_DAY_IN_SECONDS,
  ONE_YEAR_IN_SECONDS,
  ZERO: new BigNumber(0),
  ONE: new BigNumber(1),
  ONES_31: new BigNumber('4294967295'), // 2**32-1
  ONES_127: new BigNumber('340282366920938463463374607431768211455'), // 2**128-1
  ONES_255: new BigNumber(
    '115792089237316195423570985008687907853269984665640564039457584007913129639935',
  ), // 2**256-1
  INTEREST_RATE_BASE: new BigNumber('1e18'),
}

export const contractAddresses = {
  ghost: {
    56: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82', // CAKE token
    97: '0xE951845B45ab92e1F5fd1f2A338c2132B44795e6',
  },
  kingGhost: {
    56: '0x73feaa1eE314F8c655E354234017bE2193C9E24E', // Pancake MasterChef
    97: '0x5DD9A3562Ae70Ce56c4dEa5353BDa69c1315B4Ba',
  },
  wbnb: {
    56: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
    97: '0x094616F0BdFB0b526bD735Bf66Eca0Ad254ca81F',
  },
  busd: {
    56: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
  },
  eth: {
    56: '0x2170ed0880ac9a755fd29b2688956bd959f933f8',
  },
  ust: {
    56: '0x23396cf899ca06c4472205fc903bdb4de249d6fc',
  },
  xGhost: {
    56: '0x430cc60168F2Cf070C94ef6C41E370269A04D379', // FAKE
    97: '0x430cc60168F2Cf070C94ef6C41E370269A04D379',
  },
}

export const supportedPools = [
  {
    pid: 1,
    lpAddresses: {
      56: '0xA527a61703D82139F8a06Bc30097cC9CAA2df5A6',
      97: '0x5E1cf03e774d60022080C35BFCdDA631e826FaD6',
    },
    tokenAddresses: {
      56: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
      97: '0x6b3595068778dd592e39a122f4f5a5cf09c90fe2',
    },
    name: 'Ghost Party',
    symbol: 'CAKE-BNB LP',
    tokenSymbol: 'CAKE',
    quoteSymbol: 'WBNB',
  },
  {
    pid: 101,
    lpAddresses: {
      56: '0x2562f94E90dE6D9eb4fB6B3b8Eab56b15Aa4FC72',
      97: '0x23f1dBa5c8F25CF91f1153c5a907FeBDB22D0169',
    },
    tokenAddresses: {
      56: '0x7af173f350d916358af3e218bdf2178494beb748',
      97: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
    },
    name: 'UNI Unicorn',
    symbol: 'TRADE-BNB LP',
    tokenSymbol: 'TRADE',
    quoteSymbol: 'WBNB',
  },
  {
    pid: 100,
    lpAddresses: {
      56: '0xB7918560273FD56e50E9c215CC0DFE8D764C36C5',
      97: '0x5774a77597904491074ee46a6642546205BC220d',
    },
    tokenAddresses: {
      56: '0xb2bd0749dbe21f623d9baba856d3b0f0e1bfec9c',
      97: '0xdac17f958d2ee523a2206206994597c13d831ec7',
    },
    name: 'Tether Turtle',
    symbol: 'DUSK-BNB LP',
    tokenSymbol: 'DUSK',
    quoteSymbol: 'WBNB',
  },
  {
    pid: 99,
    lpAddresses: {
      56: '0xd132D2C24F29EE8ABb64a66559d1b7aa627Bd7fD',
      97: '0xF72E141D215276574bB4430A6627FB015662f3eD',
    },
    tokenAddresses: {
      56: '0xca3f508b8e4dd382ee878a314789373d80a5190a',
      97: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
    },
    name: 'Circle Snail',
    symbol: 'BIFI-BNB LP',
    tokenSymbol: 'BIFI',
    quoteSymbol: 'WBNB',
  },
  {
    pid: 98,
    lpAddresses: {
      56: '0xD20E0BcCa8B29409bf5726CB24DD779Fe337020e',
      97: '0x4C365B88905E85a17691Eb7911E34aF88DD90A29',
    },
    tokenAddresses: {
      56: '0x1ffd0b47127fdd4097e54521c9e2c7f0d66aafc5',
      97: '0x6b175474e89094c44da98b954eedeac495271d0f',
    },
    name: 'Donald DAI',
    symbol: 'TXL-BUSD LP',
    tokenSymbol: 'TXL',
    quoteSymbol: 'BUSD',
  },
  {
    pid: 97,
    lpAddresses: {
      56: '0x7b1e440240B220244761C9D9A3B07fbA1995BD84',
      97: '0x3bfb36759b2799c2396aA7A1e3B701DB155d5E77',
    },
    tokenAddresses: {
      56: '0x96Dd399F9c3AFda1F194182F71600F1B65946501',
      97: '0x57ab1ec28d129707052df4df418d58a2d46d5f51',
    },
    name: 'Spartan Dollar',
    symbol: 'COS-BNB LP',
    tokenSymbol: 'COS',
    quoteSymbol: 'WBNB',
  },
  {
    pid: 96,
    lpAddresses: {
      56: '0x7Bb89460599Dbf32ee3Aa50798BBcEae2A5F7f6a',
      97: '0xF6099895631f4Af4f7C6D24d1d81F9cBfc7d876a',
    },
    tokenAddresses: {
      56: '0xc9849e6fdb743d08faee3e34dd2d1bc69ea11a51',
      97: '0x04fa0d235c4abf4bcf4787af4cf447de572ef828',
    },
    name: 'Umami Squid',
    symbol: 'BUNNY-BNB LP',
    tokenSymbol: 'BUNNY',
    quoteSymbol: 'WBNB',
  },
  {
    pid: 95,
    lpAddresses: {
      56: '0xe022baa3E5E87658f789c9132B10d7425Fd3a389',
      97: '0x7b039a97775370b1161a19fb94a78efafce47fd0',
    },
    tokenAddresses: {
      56: '0xac51066d7bec65dc4589368da368b212745d63e8',
      97: '0xba11d00c5f74255f56a5e366f4f77f5a186d7f55',
    },
    name: 'Band-osaurus',
    symbol: 'ALICE-BNB LP',
    tokenSymbol: 'ALICE',
    quoteSymbol: 'WBNB',
  },
  {
    pid: 94,
    lpAddresses: {
      56: '0xfEc200A5E3adDD4a7915a556DDe3F5850e644020',
      97: '0xd7dda99e71bd767faf047223e7e79aea0b269606',
    },
    tokenAddresses: {
      56: '0x658A109C5900BC6d2357c87549B651670E5b0539',
      97: '0xba11d00c5f74255f56a5e366f4f77f5a186d7f55',
    },
    name: 'Band-osaurus11',
    symbol: 'FOR-BUSD LP',
    tokenSymbol: 'FOR',
    quoteSymbol: 'BUSD',
  },
  {
    pid: 93,
    lpAddresses: {
      56: '0x0F556f4E47513d1a19Be456a9aF778d7e1A226B9',
    },
    tokenAddresses: {
      56: '0x211ffbe424b90e25a15531ca322adf1559779e45',
    },
    name: 'Band-osaurus11',
    symbol: 'BUX-BNB LP',
    tokenSymbol: 'BUX',
    quoteSymbol: 'WBNB',
  },
  {
    pid: 92,
    lpAddresses: {
      56: '0xCA01F5D89d5b1d24ca5D6Ecc856D21e8a61DAFCc',
    },
    tokenAddresses: {
      56: '0x8cd6e29d3686d24d3c2018cee54621ea0f89313b',
    },
    name: 'Band-osaurus11',
    symbol: 'NULS-BUSD LP',
    tokenSymbol: 'NULS',
    quoteSymbol: 'BUSD',
  },
  // {
  //   pid: 91,
  //   lpAddresses: {
  //     56: '0xad7e515409e5a7d516411a85acc88c5e993f570a',
  //   },
  //   tokenAddresses: {
  //     56: '0x8cd6e29d3686d24d3c2018cee54621ea0f89313b',
  //   },
  //   name: 'Band-osaurus11',
  //   symbol: 'NULS-BNB LP',
  //   tokenSymbol: 'NULS',
  //   quoteSymbol: 'WBNB',
  // },
  {
    pid: 90,
    lpAddresses: {
      56: '0x83B92D283cd279fF2e057BD86a95BdEfffED6faa',
    },
    tokenAddresses: {
      56: '0xE0e514c71282b6f4e823703a39374Cf58dc3eA4f',
    },
    name: 'Band-osaurus11',
    symbol: 'BELT-BNB LP',
    tokenSymbol: 'BELT',
    quoteSymbol: 'WBNB',
  },
  {
    pid: 89,
    lpAddresses: {
      56: '0xbF36959939982D0D34B37Fb3f3425da9676C13a3',
    },
    tokenAddresses: {
      56: '0x8519ea49c997f50ceffa444d240fb655e89248aa',
    },
    name: 'Band-osaurus11',
    symbol: 'RAMP-BUSD LP',
    tokenSymbol: 'RAMP',
    quoteSymbol: 'BUSD',
  },
  {
    pid: 88,
    lpAddresses: {
      56: '0x45a9e8d48bc560416008d122c9437927fed50e7d',
    },
    tokenAddresses: {
      56: '0x81859801b01764d4f0fa5e64729f5a6c3b91435b',
    },
    name: 'Band-osaurus11',
    symbol: 'BFI-BNB LP',
    tokenSymbol: 'BFI',
    quoteSymbol: 'WBNB',
  },
  {
    pid: 87,
    lpAddresses: {
      56: '0x69ab367bc1bea1d2c0fb4dbaec6b7197951da56c',
    },
    tokenAddresses: {
      56: '0x039cb485212f996a9dbb85a9a75d898f94d38da6',
    },
    name: 'Band-osaurus11',
    symbol: 'DEXE-BUSD LP',
    tokenSymbol: 'DEXE',
    quoteSymbol: 'BUSD',
  },
  {
    pid: 86,
    lpAddresses: {
      56: '0xAB97952a2806D5c92b7046c7aB13a72A87e0097b',
    },
    tokenAddresses: {
      56: '0x8443f091997f06a61670b735ed92734f5628692f',
    },
    name: 'Band-osaurus11',
    symbol: 'BEL-BNB LP',
    tokenSymbol: 'BEL',
    quoteSymbol: 'WBNB',
  },
  {
    pid: 85,
    lpAddresses: {
      56: '0x4db28767d1527ba545ca5bbda1c96a94ed6ff242',
    },
    tokenAddresses: {
      56: '0xeca41281c24451168a37211f0bc2b8645af45092',
    },
    name: 'Band-osaurus11',
    symbol: 'TPT-BUSD LP',
    tokenSymbol: 'TPT',
    quoteSymbol: 'BUSD',
  },
  {
    pid: 84,
    lpAddresses: {
      56: '0xdc6c130299e53acd2cc2d291fa10552ca2198a6b',
    },
    tokenAddresses: {
      56: '0x7a9f28eb62c791422aa23ceae1da9c847cbec9b0',
    },
    name: 'Band-osaurus11',
    symbol: 'WATCH-BNB LP',
    tokenSymbol: 'WATCH',
    quoteSymbol: 'WBNB',
  },
  {
    pid: 83,
    lpAddresses: {
      56: '0x292ca56ed5b3330a19037f835af4a9c0098ea6fa',
    },
    tokenAddresses: {
      56: '0x26a5dfab467d4f58fb266648cae769503cec9580',
    },
    name: 'Band-osaurus11',
    symbol: 'xMARK-BUSD LP',
    tokenSymbol: 'xMARK',
    quoteSymbol: 'BUSD',
  },
  {
    pid: 82,
    lpAddresses: {
      56: '0x4D5aA94Ce6BbB1BC4eb73207a5a5d4D052cFcD67',
    },
    tokenAddresses: {
      56: '0x4131b87f74415190425ccd873048c708f8005823',
    },
    name: 'Band-osaurus11',
    symbol: 'bMXX-BNB LP',
    tokenSymbol: 'bMXX',
    quoteSymbol: 'WBNB',
  },
  {
    pid: 81,
    lpAddresses: {
      56: '0x36b8b28d37f93372188f2aa2507b68a5cd8b2664',
    },
    tokenAddresses: {
      56: '0x9678e42cebeb63f23197d726b29b1cb20d0064e5',
    },
    name: 'Band-osaurus11',
    symbol: 'IOTX-BUSD LP',
    tokenSymbol: 'IOTX',
    quoteSymbol: 'BUSD',
  },
  {
    pid: 80,
    lpAddresses: {
      56: '0x86e650350c40a5178a5d014ba37fe8556232b898',
    },
    tokenAddresses: {
      56: '0x92d7756c60dcfd4c689290e8a9f4d263b3b32241',
    },
    name: 'Band-osaurus11',
    symbol: 'BOR-BNB LP',
    tokenSymbol: 'BOR',
    quoteSymbol: 'WBNB',
  },
  {
    pid: 79,
    lpAddresses: {
      56: '0x9d8b7e4a9d53654d82f12c83448d8f92732bc761',
    },
    tokenAddresses: {
      56: '0xf35262a9d427f96d2437379ef090db986eae5d42',
    },
    name: 'Band-osaurus11',
    symbol: 'bOPEN-BNB LP',
    tokenSymbol: 'bOPEN',
    quoteSymbol: 'WBNB',
  },
  {
    pid: 78,
    lpAddresses: {
      56: '0x17580340f3daedae871a8c21d15911742ec79e0f',
    },
    tokenAddresses: {
      56: '0x947950bcc74888a40ffa2593c5798f11fc9124c4',
    },
    name: 'Band-osaurus11',
    symbol: 'SUSHI-ETH LP',
    tokenSymbol: 'SUSHI',
    quoteSymbol: 'ETH',
  },
  {
    pid: 77,
    lpAddresses: {
      56: '0x9e642d174b14faea31d842dc83037c42b53236e6',
    },
    tokenAddresses: {
      56: '0x67ee3cb086f8a16f34bee3ca72fad36f7db929e2',
    },
    name: 'Band-osaurus11',
    symbol: 'DODO-BNB LP',
    tokenSymbol: 'DODO',
    quoteSymbol: 'WBNB',
  },
  {
    pid: 76,
    lpAddresses: {
      56: '0x4576C456AF93a37a096235e5d83f812AC9aeD027',
    },
    tokenAddresses: {
      56: '0x71de20e0c4616e7fcbfdd3f875d568492cbe4739',
    },
    name: 'Band-osaurus11',
    symbol: 'SWINGBY-BNB LP',
    tokenSymbol: 'SWINGBY',
    quoteSymbol: 'WBNB',
  },
  {
    pid: 75,
    lpAddresses: {
      56: '0x5E3CD27F36932Bc0314aC4e2510585798C34a2fC',
    },
    tokenAddresses: {
      56: '0xf859bf77cbe8699013d6dbc7c2b926aaf307f830',
    },
    name: 'Band-osaurus11',
    symbol: 'BRY-BNB LP',
    tokenSymbol: 'BRY',
    quoteSymbol: 'WBNB',
  },
  {
    pid: 74,
    lpAddresses: {
      56: '0xb5ab3996808c7e489dcdc0f1af2ab212ae0059af',
    },
    tokenAddresses: {
      56: '0x44754455564474a89358b2c2265883df993b12f0',
    },
    name: 'Band-osaurus11',
    symbol: 'ZEE-BNB LP',
    tokenSymbol: 'ZEE',
    quoteSymbol: 'WBNB',
  },
  {
    pid: 73,
    lpAddresses: {
      56: '0xc1800c29cf91954357cd0bf3f0accaada3d0109c',
    },
    tokenAddresses: {
      56: '0xe40255c5d7fa7ceec5120408c78c787cecb4cfdb',
    },
    name: 'Band-osaurus11',
    symbol: 'SWGb-BNB LP',
    tokenSymbol: 'SWGb',
    quoteSymbol: 'WBNB',
  },
  {
    pid: 72,
    lpAddresses: {
      56: '0x0392957571f28037607c14832d16f8b653edd472',
    },
    tokenAddresses: {
      56: '0x52ce071bd9b1c4b00a0b92d298c512478cad67e8',
    },
    name: 'Band-osaurus11',
    symbol: 'COMP-ETH LP',
    tokenSymbol: 'COMP',
    quoteSymbol: 'ETH',
  },
  {
    pid: 71,
    lpAddresses: {
      56: '0xcbe2cf3bd012e9c1ade2ee4d41db3dac763e78f3',
    },
    tokenAddresses: {
      56: '0xd41fdb03ba84762dd66a0af1a6c8540ff1ba5dfb',
    },
    name: 'Band-osaurus11',
    symbol: 'SFP-BNB LP',
    tokenSymbol: 'SFP',
    quoteSymbol: 'WBNB',
  },
  {
    pid: 70,
    lpAddresses: {
      56: '0x99d865ed50d2c32c1493896810fa386c1ce81d91',
    },
    tokenAddresses: {
      56: '0x250632378e573c6be1ac2f97fcdf00515d0aa91b',
    },
    name: 'Band-osaurus11',
    symbol: 'BETH-ETH LP',
    tokenSymbol: 'BETH',
    quoteSymbol: 'ETH',
  },
  {
    pid: 69,
    lpAddresses: {
      56: '0xeb325a8ea1c5abf40c7ceaf645596c1f943d0948',
    },
    tokenAddresses: {
      56: '0x762539b45a1dcce3d36d080f74d1aed37844b878',
    },
    name: 'Band-osaurus11',
    symbol: 'LINA-BUSD LP',
    tokenSymbol: 'LINA',
    quoteSymbol: 'BUSD',
  },
  {
    pid: 68,
    lpAddresses: {
      56: '0x60bB03D1010b99CEAdD0dd209b64bC8bd83da161',
    },
    tokenAddresses: {
      56: '0xb59490ab09a0f526cc7305822ac65f2ab12f9723',
    },
    name: 'Band-osaurus11',
    symbol: 'LIT-BNB LP',
    tokenSymbol: 'LIT',
    quoteSymbol: 'WBNB',
  },
  {
    pid: 67,
    lpAddresses: {
      56: '0x66b9e1eac8a81f3752f7f3a5e95de460688a17ee',
    },
    tokenAddresses: {
      56: '0xc7d8d35eba58a0935ff2d5a33df105dd9f071731',
    },
    name: 'Band-osaurus11',
    symbol: 'HGET-BNB LP',
    tokenSymbol: 'HGET',
    quoteSymbol: 'WBNB',
  },
  {
    pid: 66,
    lpAddresses: {
      56: '0x74690f829fec83ea424ee1f1654041b2491a7be9',
    },
    tokenAddresses: {
      56: '0x190b589cf9fb8ddeabbfeae36a813ffb2a702454',
    },
    name: 'Band-osaurus11',
    symbol: 'BDO-BNB LP',
    tokenSymbol: 'BDO',
    quoteSymbol: 'WBNB',
  },
  {
    pid: 65,
    lpAddresses: {
      56: '0x3ef4952c7a9afbe374ea02d1bf5ed5a0015b7716',
    },
    tokenAddresses: {
      56: '0xbf7c81fff98bbe61b40ed186e4afd6ddd01337fe',
    },
    name: 'Band-osaurus11',
    symbol: 'EGLD-BNB LP',
    tokenSymbol: 'EGLD',
    quoteSymbol: 'WBNB',
  },
  {
    pid: 63,
    lpAddresses: {
      56: '0xD1F12370b2ba1C79838337648F820a87eDF5e1e6',
    },
    tokenAddresses: {
      56: '0x23396cf899ca06c4472205fc903bdb4de249d6fc',
    },
    name: 'Band-osaurus11',
    symbol: 'UST-BUSD LP',
    tokenSymbol: 'UST',
    quoteSymbol: 'BUSD',
  },
  {
    pid: 62,
    lpAddresses: {
      56: '0xc92Dc34665c8a21f98E1E38474580b61b4f3e1b9',
    },
    tokenAddresses: {
      56: '0x3947B992DC0147D2D89dF0392213781b04B25075',
    },
    name: 'Band-osaurus11',
    symbol: 'mAMZN-UST LP',
    tokenSymbol: 'mAMZN',
    quoteSymbol: 'UST',
  },
  {
    pid: 61,
    lpAddresses: {
      56: '0x852A68181f789AE6d1Da3dF101740a59A071004f',
    },
    tokenAddresses: {
      56: '0x62D71B23bF15218C7d2D7E48DBbD9e9c650B173f',
    },
    name: 'Band-osaurus11',
    symbol: 'mGOOGL-UST LP',
    tokenSymbol: 'mGOOGL',
    quoteSymbol: 'UST',
  },
  {
    pid: 60,
    lpAddresses: {
      56: '0xF609ade3846981825776068a8eD7746470029D1f',
    },
    tokenAddresses: {
      56: '0xa04F060077D90Fe2647B61e4dA4aD1F97d6649dc',
    },
    name: 'Band-osaurus11',
    symbol: 'mNFLX-UST LP',
    tokenSymbol: 'mNFLX',
    quoteSymbol: 'UST',
  },
  {
    pid: 59,
    lpAddresses: {
      56: '0xD5664D2d15cdffD597515f1c0D945c6c1D3Bf85B',
    },
    tokenAddresses: {
      56: '0xF215A127A196e3988C09d052e16BcFD365Cd7AA3',
    },
    name: 'Band-osaurus11',
    symbol: 'mTSLA-UST LP',
    tokenSymbol: 'mTSLA',
    quoteSymbol: 'UST',
  },
  {
    pid: 58,
    lpAddresses: {
      56: '0xffb9e2d5ce4378f1a89b29bf53f80804cc078102',
    },
    tokenAddresses: {
      56: '0x541e619858737031a1244a5d0cd47e5ef480342c',
    },
    name: 'Band-osaurus11',
    symbol: 'wSOTE-BNB LP',
    tokenSymbol: 'wSOTE',
    quoteSymbol: 'WBNB',
  },
  {
    pid: 57,
    lpAddresses: {
      56: '0x36b7d2e5c7877392fb17f9219efad56f3d794700',
    },
    tokenAddresses: {
      56: '0x928e55dab735aa8260af3cedada18b5f70c72f1b',
    },
    name: 'Band-osaurus11',
    symbol: 'FRONT-BNB LP',
    tokenSymbol: 'FRONT',
    quoteSymbol: 'WBNB',
  },
  {
    pid: 56,
    lpAddresses: {
      56: '0x6411310c07d8c48730172146fd6f31fa84034a8b',
    },
    tokenAddresses: {
      56: '0x948d2a81086a075b3130bac19e4c6dee1d2e3fe8',
    },
    name: 'Band-osaurus11',
    symbol: 'Helmet-BNB LP',
    tokenSymbol: 'Helmet',
    quoteSymbol: 'WBNB',
  },
  {
    pid: 55,
    lpAddresses: {
      56: '0x91589786D36fEe5B27A5539CfE638a5fc9834665',
    },
    tokenAddresses: {
      56: '0x78650b139471520656b9e7aa7a5e9276814a38e9',
    },
    name: 'Band-osaurus11',
    symbol: 'BTCST-BNB LP',
    tokenSymbol: 'BTCST',
    quoteSymbol: 'WBNB',
  },
  {
    pid: 54,
    lpAddresses: {
      56: '0xbc765fd113c5bdb2ebc25f711191b56bb8690aec',
    },
    tokenAddresses: {
      56: '0x4338665cbb7b2485a8855a139b75d5e34ab0db94',
    },
    name: 'Band-osaurus11',
    symbol: 'LTC-BNB LP',
    tokenSymbol: 'LTC',
    quoteSymbol: 'WBNB',
  },
  {
    pid: 53,
    lpAddresses: {
      56: '0x680dd100e4b394bda26a59dd5c119a391e747d18',
    },
    tokenAddresses: {
      56: '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d',
    },
    name: 'Band-osaurus11',
    symbol: 'USDC-BUSD LP',
    tokenSymbol: 'USDC',
    quoteSymbol: 'BUSD',
  },
  {
    pid: 52,
    lpAddresses: {
      56: '0x3aB77e40340AB084c3e23Be8e5A6f7afed9D41DC',
    },
    tokenAddresses: {
      56: '0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3',
    },
    name: 'Band-osaurus11',
    symbol: 'DAI-BUSD LP',
    tokenSymbol: 'DAI',
    quoteSymbol: 'BUSD',
  },
  {
    pid: 51,
    lpAddresses: {
      56: '0x20781bc3701c5309ac75291f5d09bdc23d7b7fa8',
    },
    tokenAddresses: {
      56: '0x5ac52ee5b2a633895292ff6d8a89bb9190451587',
    },
    name: 'Band-osaurus11',
    symbol: 'BSCX-BNB LP',
    tokenSymbol: 'BSCX',
    quoteSymbol: 'WBNB',
  },
  {
    pid: 50,
    lpAddresses: {
      56: '0x01ecc44ddd2d104f44d2aa1a2bd9dfbc91ae8275',
    },
    tokenAddresses: {
      56: '0xdff8cb622790b7f92686c722b02cab55592f152c',
    },
    name: 'Band-osaurus11',
    symbol: 'TEN-BNB LP',
    tokenSymbol: 'TEN',
    quoteSymbol: 'WBNB',
  },
  {
    pid: 49,
    lpAddresses: {
      56: '0xbe14f3a89a4f7f279af9d99554cf12e8c29db921',
    },
    tokenAddresses: {
      56: '0x72faa679e1008ad8382959ff48e392042a8b06f7',
    },
    name: 'Band-osaurus11',
    symbol: 'bALBT-BNB LP',
    tokenSymbol: 'bALBT',
    quoteSymbol: 'WBNB',
  },
  // {
  //   pid: 46,
  //   lpAddresses: {
  //     56: '0x64373608f2e93ea97ad4d8ca2cce6b2575db2f55',
  //   },
  //   tokenAddresses: {
  //     56: '0xf05e45ad22150677a017fbd94b84fbb63dc9b44c',
  //   },
  //   name: 'Band-osaurus11',
  //   symbol: 'OG-BNB LP',
  //   tokenSymbol: 'OG',
  // },
  // {
  //   pid: 47,
  //   lpAddresses: {
  //     56: '0xd6b900d5308356317299dafe303e661271aa12f1',
  //   },
  //   tokenAddresses: {
  //     56: '0x80d5f92c2c8c682070c95495313ddb680b267320',
  //   },
  //   name: 'Band-osaurus11',
  //   symbol: 'ASR-BNB LP',
  //   tokenSymbol: 'ASR',
  // },
  // {
  //   pid: 48,
  //   lpAddresses: {
  //     56: '0xd5b3ebf1a85d32c73a82b40f75e1cd929caf4029',
  //   },
  //   tokenAddresses: {
  //     56: '0x25e9d05365c867e59c1904e7463af9f312296f9e',
  //   },
  //   name: 'Band-osaurus11',
  //   symbol: 'ATM-BNB LP',
  //   tokenSymbol: 'ATM',
  // },
  {
    pid: 45,
    lpAddresses: {
      56: '0x58B58cab6C5cF158f63A2390b817710826d116D0',
    },
    tokenAddresses: {
      56: '0xf21768ccbc73ea5b6fd3c687208a7c2def2d966e',
    },
    name: 'Band-osaurus11',
    symbol: 'REEF-BNB LP',
    tokenSymbol: 'REEF',
    quoteSymbol: 'WBNB',
  },
  {
    pid: 44,
    lpAddresses: {
      56: '0x470bc451810b312bbb1256f96b0895d95ea659b1',
    },
    tokenAddresses: {
      56: '0x233d91a0713155003fc4dce0afa871b508b3b715',
    },
    name: 'Band-osaurus11',
    symbol: 'Ditto-BNB LP',
    tokenSymbol: 'Ditto',
    quoteSymbol: 'WBNB',
  },
  // {
  //   pid: 43,
  //   lpAddresses: {
  //     56: '0x51a2ffa5b7de506f9a22549e48b33f6cf0d9030e',
  //   },
  //   tokenAddresses: {
  //     56: '0xc40c9a843e1c6d01b7578284a9028854f6683b1b',
  //   },
  //   name: 'Band-osaurus11',
  //   symbol: 'JUV-BNB LP',
  //   tokenSymbol: 'JUV',
  // },
  // {
  //   pid: 42,
  //   lpAddresses: {
  //     56: '0x9c4f6a5050cf863e67a402e8b377973b4e3372c1',
  //   },
  //   tokenAddresses: {
  //     56: '0xbc5609612b7c44bef426de600b5fd1379db2ecf1',
  //   },
  //   name: 'Band-osaurus11',
  //   symbol: 'PSG-BNB LP',
  //   tokenSymbol: 'PSG',
  // },
  {
    pid: 39,
    lpAddresses: {
      56: '0xbEA35584b9a88107102ABEf0BDeE2c4FaE5D8c31',
    },
    tokenAddresses: {
      56: '0x728c5bac3c3e370e372fc4671f9ef6916b814d8b',
    },
    name: 'Band-osaurus11',
    symbol: 'UNFI-BNB LP',
    tokenSymbol: 'UNFI',
    quoteSymbol: 'WBNB',
  },
  {
    pid: 41,
    lpAddresses: {
      56: '0xff17ff314925dff772b71abdff2782bc913b3575',
    },
    tokenAddresses: {
      56: '0x4bd17003473389a42daf6a0a729f6fdb328bbbd7',
    },
    name: 'Band-osaurus11',
    symbol: 'VAI-BUSD LP',
    tokenSymbol: 'VAI',
    quoteSymbol: 'BUSD',
  },
  {
    pid: 40,
    lpAddresses: {
      56: '0xC743Dc05F03D25E1aF8eC5F8228f4BD25513c8d0',
    },
    tokenAddresses: {
      56: '0x63870a18b6e42b01ef1ad8a2302ef50b7132054f',
    },
    name: 'Band-osaurus11',
    symbol: 'BLK-BNB LP',
    tokenSymbol: 'BLK',
    quoteSymbol: 'WBNB',
  },
  {
    pid: 37,
    lpAddresses: {
      56: '0x9f40e8a2fcaa267a0c374b6c661e0b372264cc3d',
    },
    tokenAddresses: {
      56: '0xf79037f6f6be66832de4e7516be52826bc3cbcc4',
    },
    name: 'Band-osaurus11',
    symbol: 'HARD-BNB LP',
    tokenSymbol: 'HARD',
    quoteSymbol: 'WBNB',
  },
  {
    pid: 2,
    lpAddresses: {
      56: '0x1b96b92314c44b159149f7e0303511fb2fc4774f',
    },
    tokenAddresses: {
      56: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
    },
    name: 'Band-osaurus11',
    symbol: 'BUSD-BNB LP',
    tokenSymbol: 'BUSD',
    quoteSymbol: 'WBNB',
  },
  {
    pid: 3,
    lpAddresses: {
      56: '0xba51d1ab95756ca4eab8737ecd450cd8f05384cf',
    },
    tokenAddresses: {
      56: '0x3ee2200efb3400fabb9aacf31297cbdd1d435d47',
    },
    name: 'Band-osaurus11',
    symbol: 'ADA-BNB LP',
    tokenSymbol: 'ADA',
    quoteSymbol: 'WBNB',
  },
  {
    pid: 4,
    lpAddresses: {
      56: '0xc639187ef82271d8f517de6feae4faf5b517533c',
    },
    tokenAddresses: {
      56: '0xad6caeb32cd2c308980a548bd0bc5aa4306c6c18',
    },
    name: 'Band-osaurus11',
    symbol: 'BAND-BNB LP',
    tokenSymbol: 'BAND',
    quoteSymbol: 'WBNB',
  },
  {
    pid: 5,
    lpAddresses: {
      56: '0xbcd62661a6b1ded703585d3af7d7649ef4dcdb5c',
    },
    tokenAddresses: {
      56: '0x7083609fce4d1d8dc0c979aab8c869ea2c873402',
    },
    name: 'Band-osaurus11',
    symbol: 'DOT-BNB LP',
    tokenSymbol: 'DOT',
    quoteSymbol: 'WBNB',
  },
  {
    pid: 6,
    lpAddresses: {
      56: '0x981d2ba1b298888408d342c39c2ab92e8991691e',
    },
    tokenAddresses: {
      56: '0x56b6fb708fc5732dec1afc8d8556423a2edccbd6',
    },
    name: 'Band-osaurus11',
    symbol: 'EOS-BNB LP',
    tokenSymbol: 'EOS',
    quoteSymbol: 'WBNB',
  },
  {
    pid: 7,
    lpAddresses: {
      56: '0xaebe45e3a03b734c68e5557ae04bfc76917b4686',
    },
    tokenAddresses: {
      56: '0xf8a0bf9cf54bb92f17374d9e9a321e6a111a51bd',
    },
    name: 'Band-osaurus11',
    symbol: 'LINK-BNB LP',
    tokenSymbol: 'LINK',
    quoteSymbol: 'WBNB',
  },
  {
    pid: 11,
    lpAddresses: {
      56: '0xc15fa3E22c912A276550F3E5FE3b0Deb87B55aCd',
    },
    tokenAddresses: {
      56: '0x55d398326f99059ff775485246999027b3197955',
    },
    name: 'Band-osaurus11',
    symbol: 'USDT-BUSD LP',
    tokenSymbol: 'USDT',
    quoteSymbol: 'BUSD',
  },
  {
    pid: 12,
    lpAddresses: {
      56: '0x610e7a287c27dfFcaC0F0a94f547Cc1B770cF483',
    },
    tokenAddresses: {
      56: '0x4b0f1812e5df2a09796481ff14017e6005508003',
    },
    name: 'Band-osaurus11',
    symbol: 'TWT-BNB LP',
    tokenSymbol: 'TWT',
    quoteSymbol: 'WBNB',
  },
  {
    pid: 13,
    lpAddresses: {
      56: '0x41182c32F854dd97bA0e0B1816022e0aCB2fc0bb',
    },
    tokenAddresses: {
      56: '0xcf6bb5389c92bdda8a3747ddb454cb7a64626c63',
    },
    name: 'Band-osaurus11',
    symbol: 'XVS-BNB LP',
    tokenSymbol: 'XVS',
    quoteSymbol: 'WBNB',
  },
  {
    pid: 14,
    lpAddresses: {
      56: '0x70D8929d04b60Af4fb9B58713eBcf18765aDE422',
    },
    tokenAddresses: {
      56: '0x2170ed0880ac9a755fd29b2688956bd959f933f8',
    },
    name: 'Band-osaurus11',
    symbol: 'ETH-BNB LP',
    tokenSymbol: 'ETH',
    quoteSymbol: 'WBNB',
  },
  {
    pid: 15,
    lpAddresses: {
      56: '0x7561EEe90e24F3b348E1087A005F78B4c8453524',
    },
    tokenAddresses: {
      56: '0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c',
    },
    name: 'Band-osaurus11',
    symbol: 'BTCB-BNB LP',
    tokenSymbol: 'BTCB',
    quoteSymbol: 'WBNB',
  },
  {
    pid: 16,
    lpAddresses: {
      56: '0x4e0f3385d932F7179DeE045369286FFa6B03d887',
    },
    tokenAddresses: {
      56: '0xa1faa113cbe53436df28ff0aee54275c13b40975',
    },
    name: 'Band-osaurus11',
    symbol: 'ALPHA-BNB LP',
    tokenSymbol: 'ALPHA',
    quoteSymbol: 'WBNB',
  },
  {
    pid: 17,
    lpAddresses: {
      56: '0x20bcc3b8a0091ddac2d0bc30f68e6cbb97de59cd',
    },
    tokenAddresses: {
      56: '0x55d398326f99059ff775485246999027b3197955',
    },
    name: 'Band-osaurus11',
    symbol: 'USDT-BNB LP',
    tokenSymbol: 'USDT',
    quoteSymbol: 'WBNB',
  },
  {
    pid: 18,
    lpAddresses: {
      56: '0xc7b4b32a3be2cb6572a1c9959401f832ce47a6d2',
    },
    tokenAddresses: {
      56: '0x1d2f0da169ceb9fc7b3144628db156f3f6c60dbe',
    },
    name: 'Band-osaurus11',
    symbol: 'XRP-BNB LP',
    tokenSymbol: 'XRP',
    quoteSymbol: 'WBNB',
  },
  {
    pid: 19,
    lpAddresses: {
      56: '0x2333c77fc0b2875c11409cdcd3c75d42d402e834',
    },
    tokenAddresses: {
      56: '0x0eb3a705fc54725037cc9e008bdede697f62f335',
    },
    name: 'Band-osaurus11',
    symbol: 'ATOM-BNB LP',
    tokenSymbol: 'ATOM',
    quoteSymbol: 'WBNB',
  },
  {
    pid: 20,
    lpAddresses: {
      56: '0x574a978c2d0d36d707a05e459466c7a1054f1210',
    },
    tokenAddresses: {
      56: '0x7f70642d88cf1c4a3a7abb072b53b929b653eda5',
    },
    name: 'Band-osaurus11',
    symbol: 'YFII-BNB LP',
    tokenSymbol: 'YFII',
    quoteSymbol: 'WBNB',
  },
  // {
  //   pid: 21,
  //   lpAddresses: {
  //     56: '0x56c77d59e82f33c712f919d09fceddf49660a829',
  //   },
  //   tokenAddresses: {
  //     56: '0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3',
  //   },
  //   name: 'Band-osaurus11',
  //   symbol: 'DAI-BNB LP',
  //   tokenSymbol: 'DAI',
  // },
  {
    pid: 22,
    lpAddresses: {
      56: '0x5acac332f0f49c8badc7afd0134ad19d3db972e6',
    },
    tokenAddresses: {
      56: '0x16939ef78684453bfdfb47825f8a5f714f12623a',
    },
    name: 'Band-osaurus11',
    symbol: 'XTZ-BNB LP',
    tokenSymbol: 'XTZ',
    quoteSymbol: 'WBNB',
  },
  {
    pid: 23,
    lpAddresses: {
      56: '0x54edd846db17f43b6e43296134ecd96284671e81',
    },
    tokenAddresses: {
      56: '0x8ff795a6f4d97e7887c79bea79aba5cc76444adf',
    },
    name: 'Band-osaurus11',
    symbol: 'BCH-BNB LP',
    tokenSymbol: 'BCH',
    quoteSymbol: 'WBNB',
  },
  {
    pid: 24,
    lpAddresses: {
      56: '0x68Ff2ca47D27db5Ac0b5c46587645835dD51D3C1',
    },
    tokenAddresses: {
      56: '0x88f1a5ae2a3bf98aeaf342d26b30a79438c9142e',
    },
    name: 'Band-osaurus11',
    symbol: 'YFI-BNB LP',
    tokenSymbol: 'YFI',
    quoteSymbol: 'WBNB',
  },
  {
    pid: 25,
    lpAddresses: {
      56: '0x4269e7F43A63CEA1aD7707Be565a94a9189967E9',
    },
    tokenAddresses: {
      56: '0xbf5140a22578168fd562dccf235e5d43a02ce9b1',
    },
    name: 'Band-osaurus11',
    symbol: 'UNI-BNB LP',
    tokenSymbol: 'UNI',
    quoteSymbol: 'WBNB',
  },
  {
    pid: 26,
    lpAddresses: {
      56: '0x35fe9787f0ebf2a200bac413d3030cf62d312774',
    },
    tokenAddresses: {
      56: '0x0d8ce2a99bb6e3b7db580ed848240e4a0f9ae153',
    },
    name: 'Band-osaurus11',
    symbol: 'FIL-BNB LP',
    tokenSymbol: 'FIL',
    quoteSymbol: 'WBNB',
  },
  {
    pid: 27,
    lpAddresses: {
      56: '0x7a34bd64d18e44CfdE3ef4B81b87BAf3EB3315B6',
    },
    tokenAddresses: {
      56: '0xa2b726b1145a4773f68593cf171187d8ebe4d495',
    },
    name: 'Band-osaurus11',
    symbol: 'INJ-BNB LP',
    tokenSymbol: 'INJ',
    quoteSymbol: 'WBNB',
  },
  // {
  //   pid: 29,
  //   lpAddresses: {
  //     56: '0x30479874f9320a62bce3bc0e315c920e1d73e278',
  //   },
  //   tokenAddresses: {
  //     56: '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d',
  //   },
  //   name: 'Band-osaurus11',
  //   symbol: 'USDC-BNB LP',
  //   tokenSymbol: 'USDC',
  // },
  {
    pid: 30,
    lpAddresses: {
      56: '0x752E713fB70E3FA1Ac08bCF34485F14A986956c4',
    },
    tokenAddresses: {
      56: '0x47bead2563dcbf3bf2c9407fea4dc236faba485a',
    },
    name: 'Band-osaurus11',
    symbol: 'SXP-BNB LP',
    tokenSymbol: 'SXP',
    quoteSymbol: 'WBNB',
  },
  {
    pid: 32,
    lpAddresses: {
      56: '0x7793870484647a7278907498ec504879d6971EAb',
    },
    tokenAddresses: {
      56: '0xa8c2b8eec3d368c0253ad3dae65a5f2bbb89c929',
    },
    name: 'Band-osaurus11',
    symbol: 'CTK-BNB LP',
    tokenSymbol: 'CTK',
    quoteSymbol: 'WBNB',
  },
  // {
  //   pid: 34,
  //   lpAddresses: {
  //     56: '0x7cd05f8b960ba071fdf69c750c0e5a57c8366500',
  //   },
  //   tokenAddresses: {
  //     56: '0x0da6ed8b13214ff28e9ca979dd37439e8a88f6c4',
  //   },
  //   name: 'Band-osaurus11',
  //   symbol: 'STAX-CAKE LP',
  //   tokenSymbol: 'STAX',
  // },
  // {
  //   pid: 35,
  //   lpAddresses: {
  //     56: '0x745c4fd226e169d6da959283275a8e0ecdd7f312',
  //   },
  //   tokenAddresses: {
  //     56: '0xa1303e6199b319a891b79685f0537d289af1fc83',
  //   },
  //   name: 'Band-osaurus11',
  //   symbol: 'NAR-CAKE LP',
  //   tokenSymbol: 'NAR',
  // },
  // {
  //   pid: 36,
  //   lpAddresses: {
  //     56: '0x2730bf486d658838464a4ef077880998d944252d',
  //   },
  //   tokenAddresses: {
  //     56: '0xbfa0841f7a90c4ce6643f651756ee340991f99d5',
  //   },
  //   name: 'Band-osaurus11',
  //   symbol: 'NYA-CAKE LP',
  //   tokenSymbol: 'NYA',
  // },
  // {
  //   pid: 38,
  //   lpAddresses: {
  //     56: '0x970858016C963b780E06f7DCfdEf8e809919BcE8',
  //   },
  //   tokenAddresses: {
  //     56: '0xe64f5cb844946c1f102bd25bbd87a5ab4ae89fbe',
  //   },
  //   name: 'Band-osaurus11',
  //   symbol: 'bROOBEE-CAKE LP',
  //   tokenSymbol: 'bROOBEE',
  // },
  // {
  //   pid: 8,
  //   lpAddresses: {
  //     56: '0xc2eed0f5a0dc28cfa895084bc0a9b8b8279ae492',
  //   },
  //   tokenAddresses: {
  //     56: '0xE02dF9e3e622DeBdD69fb838bB799E3F168902c5',
  //   },
  //   name: 'Band-osaurus11',
  //   symbol: 'BAKE-BNB Bakery LP',
  //   tokenSymbol: 'BAKE',
  // },
  // {
  //   pid: 9,
  //   lpAddresses: {
  //     56: '0xd937FB9E6e47F3805981453BFB277a49FFfE04D7',
  //   },
  //   tokenAddresses: {
  //     56: '0xae9269f27437f0fcbc232d39ec814844a51d6b8f',
  //   },
  //   name: 'Band-osaurus11',
  //   symbol: 'BURGER-BNB LP',
  //   tokenSymbol: 'BURGER',
  // },
  // {
  //   pid: 10,
  //   lpAddresses: {
  //     56: '0x3Da30727ed0626b78C212e81B37B97A8eF8A25bB',
  //   },
  //   tokenAddresses: {
  //     56: '0xE02dF9e3e622DeBdD69fb838bB799E3F168902c5',
  //   },
  //   name: 'Band-osaurus11',
  //   symbol: 'BAKE-BNB LP',
  //   tokenSymbol: 'BAKE',
  // },
]

export const supportedRoutes = {
  BNB: {
    symbol: 'BNB',
    addresses: {
      97: '0x0000000000000000000000000000000000000000',
      56: '0x0000000000000000000000000000000000000000',
    },
    decimals: 18,
    routes: {
      1: {
        97: '0xed3f303e1df5631a9eb13a05e08cd114180aaf10',
      },
      10: {
        97: '0x0578Fe997b98cC324F23118CFfbC0E31eBA31791',
      },
      100: {
        97: '0x8180c47336D85922B50aEEAFD7f537C2D479577D',
      },
      1000: {
        97: '0x1f516F7ce709f6A2c22D66220Ba92857Ad7e7c1f',
      },
    },
  },
  BUSD: {
    symbol: 'BUSD',
    addresses: {
      97: '0x70b7aa7A5963C4E4F7fB1Abd0d37Fac1a0fF6523',
    },
    decimals: 18,
    routes: {
      10: {
        97: '0x08A7e02b9aA2Cc160a34D6fC29d64CEfa363484f',
      },
      100: {
        97: '0xA28DE56B493f19918A5cccA8ba52100F46e6cb58',
      },
      1000: {
        97: '0x662F1E0122199496D34Dcf75915dd84984AceBdf',
      },
      10000: {
        97: '0x1916Ab84416239F5295D53d51A2ec4B7A24b0470',
      },
    },
  },
}
