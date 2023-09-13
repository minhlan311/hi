import { AutoComplete, Input } from 'antd'
import { useState } from 'react'
import { SearchOutlined, UserOutlined } from '@ant-design/icons'
import css from './SearchBox.module.scss'
import ButtonCustom from '../ButtonCustom/ButtonCustom'
type Props = {
  type: 'searchBar' | 'searchDoc' | 'searchButton'
}

function SearchBox(props: Props) {
  const { type } = props
  const [value, setValue] = useState('')
  const handleSearch = (value: string) => {
    console.log(value)
  }

  const onSelect = (value: string) => {
    console.log('onSelect', value)
  }
  const renderTitle = (title: string) => (
    <span>
      {title}
      <a
        style={{ float: 'right' }}
        href='https://www.google.com/search?q=antd'
        target='_blank'
        rel='noopener noreferrer'
      >
        more
      </a>
    </span>
  )

  const renderItem = (title: string, count: number) => ({
    value: title,
    label: (
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        {title}
        <span>
          <UserOutlined /> {count}
        </span>
      </div>
    )
  })

  const options = [
    {
      label: renderTitle('Libraries'),
      options: [renderItem('AntDesign', 10000), renderItem('AntDesign UI', 10600)]
    },
    {
      label: renderTitle('Solutions'),
      options: [renderItem('AntDesign UI FAQ', 60100), renderItem('AntDesign FAQ', 30010)]
    },
    {
      label: renderTitle('Articles'),
      options: [renderItem('AntDesign design language', 100000)]
    }
  ]

  if (type === 'searchBar')
    return (
      <div className={css.searchBox}>
        <ButtonCustom
          className={css.searchButton}
          type='text'
          icon={<SearchOutlined />}
          onClick={() => handleSearch}
          disabled={value.length < 3}
        ></ButtonCustom>
        <AutoComplete
          popupMatchSelectWidth={252}
          className={css.searchDropdown}
          options={options}
          onSelect={onSelect}
          onSearch={handleSearch}
        >
          <Input
            className={css.searchInput}
            onChange={(e) => setValue(e.target.value)}
            placeholder='学びたいトピックを検索　例：データサイエンス, プログラミング, Webデザイン'
          />
        </AutoComplete>
      </div>
    )
  else if (type === 'searchButton') {
    return <ButtonCustom type='text' icon={<SearchOutlined />}></ButtonCustom>
  } else return <Input.Search placeholder='マイコースを検索' enterButton />
}

export default SearchBox
