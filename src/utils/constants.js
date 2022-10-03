export default {
  ASCIICODE: [46, 8, 9, 27, 13, 110, 190],
  PAGING: 20,
  PAGE: 1,
  SORT_ASC: 'ascending',
  SORT_DESC: 'descending',
  MALE: 1,
  FEMALE: 2,
  TEXT_MALE: '男',
  TEXT_FEMALE: '女',
  PAGE_SIZE_DEFAULT: '20',
  PAGE_SIZE: [
    {
      label: '20',
      value: '20'
    },
    {
      label: '50',
      value: '50'
    },
    {
      label: '100',
      value: '100'
    }
  ],
  TYPE_SORT: ['ascending', 'descending'],
  HTTP: {
    OK: 200,
    BAD_REQUEST: 400,
    UNPROCESSABLE_ENTITY: 422,
    NOT_FOUND: 404
  },
  STATUS: {
    ACTIVE: 1,
    NON_ACTIVE: 0
  },
  FROM_CITY: [
    {
      label: 'Hà Nội'
    },
    {
      label: 'Ninh Bình'
    }
  ],
  TO_CITY: [
    {
      label: 'Hà Nội'
    },
    {
      label: 'Ninh Bình'
    }
  ]
}
