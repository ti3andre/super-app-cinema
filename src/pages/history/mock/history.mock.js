export default [
  {
    id: 1,
    establishment_image: 'https://node.clubecerto.com.br/superapp/images/establishments/kinoplexcinema.jpg',
    establishment: 'Kinoplex Cinema',
    date: '27/04/2022 - 15:30 (Sex)',
    code: 'ABCDEF1234567',
    voucher: [
      {
        id_product: '40',
        code: '123',
        due_date: '27/04/2022'
      },
      {
        id_product: '19',
        code: '123',
        due_date: '27/04/2022'
      },
    ],
    combo: [
      {
        id_product: '89',
        code: 'WAS',
        due_date: '27/04/2022'
      },
      {
        id_product: '32',
        code: 'TYR',
        due_date: '27/04/2022'
      },
    ],
    total: '88,00'
  },
  {
      id: 2,
      establishment_image: 'https://node.clubecerto.com.br/superapp/images/establishments/NovoLogoAzul.png',
      establishment: 'Cinépolis',
      date: '29/04/2022 - 15:30 (Dom)',
      code: 'ABCDEF1234568',
      voucher: [
        {
            id_product: '15',
            code: '123',
            due_date: '29/04/2022'
        },
        {
            id_product: '17',
            code: '321',
            due_date: '29/04/2022'
        },
      ],
      total: '38,00'
    },
    {
      id: 3,
      establishment_image: 'https://node.clubecerto.com.br/superapp/images/establishments/NovoLogoAzul.png',
      establishment: 'Cinépolis',
      date: '30/04/2022 - 15:30 (Seg)',
      code: 'ABCDEF1234569',
      voucher: [
        {
          id_product: '12',
          code: '567',
          due_date: '30/04/2022'
        },
        {
          id_product: '26',
          code: '890',
          due_date: '30/04/2022'
        },
        {
          id_product: '26',
          code: '123',
          due_date: '30/04/2022'
        },
      ],
      combo: [
        {
          id_product: '10',
          code: 'HJT',
          due_date: '30/04/2022'
        },
        {
          id_product: '10',
          code: 'EFG',
          due_date: '30/04/2022'
        },
        {
          id_product: '10',
          code: 'ABC',
          due_date: '30/04/2022'
        },
      ],
      total: '132,00'
    },
]