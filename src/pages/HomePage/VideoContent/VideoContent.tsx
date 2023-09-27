import './VideoContent.scss'
import ButtonShake from './components/ButtonShake/ButtonShake'
import imac from '@/assets/images/backgrounds/imac.jpg'

export default function VideoContent() {
  return (
    <div className='video-content-container'>
      <div className='div-title'>
        <p className='desc-steps-top'>GIẢI PHÁP HOÀN HẢO</p>
        <div className='ucam-desc'>
          <h2>UCAM THIẾT KẾ RIÊNG CHO BẠN</h2>
        </div>
        <div className='hr-class' />
      </div>
      <div className='container-1920px'>
        <div className='content-div-container'>
          <div className='content'>
            <div className='div-inContent'>
              <div className='left'>01</div>
              <div className='mid'>
                {' '}
                <strong>Linh hoạt thời gian</strong> - phù hợp với người bận rộn
              </div>
              <div className='right'></div>
            </div>

            <div className='div-inContent-ves'>
              <div className='left-ves'></div>
              <div className='mid'>
                <strong>1 Giảng viên, kèm 1 học viên</strong> - giao tiếp sửa lỗi liên tục
              </div>
              <div className='right-ves'>02</div>
            </div>
            <div className='div-inContent'>
              <div className='left'>03</div>
              <div className='mid'>
                100% Giảng viên đạt
                <strong> 7.0+ ITELT/850+ TOEIC </strong>
                hoặc có bằng cấp tương đương
              </div>
              <div className='right'></div>
            </div>
            <div className='div-inContent-ves'>
              <div className='left-ves'></div>
              <div className='mid'>
                Lộ trình <strong>cá nhân hóa</strong> - thiết kế bài giảng theo nhu cầu
              </div>
              <div className='right-ves'>04</div>
            </div>
            <div className='div-inContent'>
              <div className='left'>05</div>
              <div className='mid'>
                X5 hiệu quả với các <strong>phương pháp tiên tiến</strong>
              </div>
              <div className='right'></div>
            </div>
          </div>
          <div className='video-content'>
            <img className='img-mac' src={imac} alt='' />
            <iframe
              className='iframe'
              width='100%'
              height='100%'
              src='https://www.youtube.com/embed/6-uzl3hLfLM?si=j_FALjAZUMf5uV8B'
              title='YouTube video player'
              allow='accelerometer;fullscreen; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
            ></iframe>
          </div>
        </div>
      </div>
      <div className='div-title-bottom'>
        <span className='number'>500.000+ </span>
        <span className='desc'>
          {' '}
          Học viên ở Việt Nam và toàn thế giới đã trải nghiệm và giao tiếp tiếng Anh thành công, còn bạn...?
        </span>
        <div className='button'>
          <ButtonShake />
        </div>
      </div>
    </div>
  )
}
