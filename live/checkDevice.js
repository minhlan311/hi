/* eslint-disable no-inner-declarations */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import h from './helpers.js'

export const changeVideoDevice = (deviceId, callback) => {
  const videoDemo = document.getElementById('video-demo')

  navigator.mediaDevices
    .getUserMedia({ video: true, audio: false })
    .then(function (stream) {
      // Lấy track video từ stream
      var videoTrack = stream.getVideoTracks()[0]

      // Tạo constraints mới với deviceId của thiết bị video
      var constraints = { video: { deviceId: { exact: deviceId } } }

      // Lấy stream mới với thiết bị video đã chọn
      navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function (newStream) {
          // Lấy track video mới từ stream mới
          var newVideoTrack = newStream.getVideoTracks()[0]

          // Thay thế track video trong stream cũ bằng track video mới
          stream.removeTrack(videoTrack)
          stream.addTrack(newVideoTrack)

          // Sử dụng stream mới chứa thiết bị video đã chọn
          if (!callback) {
            videoDemo.srcObject = stream
            videoDemo.addEventListener('loadedmetadata', () => {
              videoDemo.play()
              videoDemo.muted = false
              videoDemo.volume = 1
              videoDemo.style.width = '100%'
            })
            window.myStream = stream
          } else {
            callback(stream)
          }
        })
        .catch(function (error) {
          // Lỗi: không thể lấy stream với thiết bị mới
          console.error('Lỗi: ' + error)
        })
    })
    .catch(function (error) {
      // Lỗi: không thể lấy stream video ban đầu
      console.error('Lỗi: ' + error)
    })
}

window.addEventListener(
  'load',
  function (e) {
    const videoDemo = document.getElementById('video-demo')

    function getAndSetUserStream(callback) {
      h.getUserFullMedia()
        .then((stream) => {
          document.getElementById('video-demo').srcObject = stream
          videoDemo.muted = false
          navigator.mediaDevices
            .enumerateDevices()
            .then(function (devices) {
              // Lọc các thiết bị âm thanh là microphone
              var microphones = devices.filter(function (device) {
                return device.kind === 'audioinput'
              })
              window.localStorage.setItem('mic', microphones[0].deviceId)

              // In ra danh sách các thiết bị microphone
              microphones.forEach(function (mic) {
                console.log('Microphone: ' + mic.deviceId)
                let option = document.createElement('option')
                option.value = mic.deviceId
                option.text = mic.label
                document.getElementById('mic-select').appendChild(option)
              })

              // Lọc các thiết bị video là webcam
              var webcams = devices.filter(function (device) {
                return device.kind === 'videoinput'
              })
              window.localStorage.setItem('webcam', webcams[0].deviceId)

              // In ra danh sách các thiết bị webcam
              webcams.forEach(function (webcam) {
                let option = document.createElement('option')
                option.value = webcam.deviceId
                option.text = webcam.label
                document.getElementById('webcam-select').appendChild(option)
              })
            })
            .catch(function (error) {
              // Lỗi: không thể lấy danh sách thiết bị
              console.error('Lỗi: ' + error)
              alert('Thiết bị không hợp lệ')
            })
          window.myStream = stream
        })
        .catch((e) => {
          console.error(`stream error: ${e}`)
          alert('Không thể cho phép truy cập thiết bị')
        })
    }

    function changeAudioDevice(deviceId) {
      navigator.mediaDevices
        .getUserMedia({ audio: true, video: false })
        .then(function (stream) {
          // Lấy track âm thanh từ stream
          var audioTrack = stream.getAudioTracks()[0]

          // Tạo constraints mới với deviceId của thiết bị âm thanh
          var constraints = { audio: { deviceId: { exact: deviceId } } }

          // Lấy stream mới với thiết bị âm thanh đã chọn
          navigator.mediaDevices
            .getUserMedia(constraints)
            .then(function (newStream) {
              // Lấy track âm thanh mới từ stream mới
              var newAudioTrack = newStream.getAudioTracks()[0]

              // Thay thế track âm thanh trong stream cũ bằng track âm thanh mới
              stream.removeTrack(audioTrack)
              stream.addTrack(newAudioTrack)

              // Sử dụng stream mới chứa thiết bị âm thanh đã chọn

              // test audio
              var audio = new Audio()
              audio.srcObject = stream
              window.myStream = stream
            })
            .catch(function (error) {
              // Lỗi: không thể lấy stream với thiết bị mới
              console.error('Lỗi: ' + error)
            })
        })
        .catch(function (error) {
          // Lỗi: không thể lấy stream âm thanh ban đầu
          console.error('Lỗi: ' + error)
        })
    }

    document.getElementById('mic-select').onchange = function () {
      changeAudioDevice(this.value)
      window.localStorage.setItem('mic', this.value)
    }

    document.getElementById('webcam-select').onchange = function () {
      changeVideoDevice(this.value)
      window.localStorage.setItem('webcam', this.value)
    }

    getAndSetUserStream()
  },
  false
)
