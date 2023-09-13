import SelectCustom from '@/components/SelectCustom/SelectCustom'
import chn from '../../assets/icons/china_flag.svg'
import eng from '../../assets/icons/eng_flag.svg'
import ger from '../../assets/icons/germany_flag.svg'
import jpn from '../../assets/icons/japan_flag.svg'
import kor from '../../assets/icons/korea_flag.svg'
import vie from '../../assets/icons/vi_flag.svg'

const LanguageChange = () => {
  const flagList = [
    { value: 'ENG', label: 'ENG', icon: <img src={eng} alt='flag' /> },
    { value: 'VIE', label: 'VIE', icon: <img src={vie} alt='flag' /> },
    { value: 'CHN', label: 'CHN', icon: <img src={chn} alt='flag' /> },
    { value: 'JPN', label: 'JPN', icon: <img src={jpn} alt='flag' /> },
    { value: 'KOR', label: 'KOR', icon: <img src={kor} alt='flag' /> },
    { value: 'GER', label: 'GER', icon: <img src={ger} alt='flag' /> }
  ]
  return <SelectCustom className='lang-change' defaultValue='VIE' options={flagList} suffixIcon={false} />
}

export default LanguageChange
