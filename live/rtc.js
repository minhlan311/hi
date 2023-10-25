/* eslint-disable no-inner-declarations */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import h from './helpers.js'
import { changeVideoDevice } from './checkDevice.js'

window.addEventListener('load', () => {
  document.getElementById('chat-pane').style.right = '-100vw'
  let isOnCamera = true
  const urlParams = new URLSearchParams(window.location.search)
  const roomId = urlParams.get('room_id')
  if (!roomId) window.location.href = '/'
  const room = {
    id: roomId,
    uuid: 'sdcfnsb',
    name: 'Phòng học',
    host_id: 1779
  }
  const user = JSON.parse(localStorage.getItem('profile'))

  if (!user) {
    window.location.href = '/login'
  }

  document.getElementById('turn-on-camera').addEventListener('change', function (e) {
    const isOn = e.target.checked
    isOnCamera = e.target.checked
    // document.getElementById('toggle-video').click()
    const videoDemo = document.getElementById(`video-demo`)
    changeVideoDevice(
      window.localStorage.getItem('webcam'),
      (stream) => {
        myStream = stream
        videoDemo.srcObject = stream
      },
      { isOnCamera: isOn }
    )
  })

  const SOCKET_URL = 'https://hiblue.fun/stream'
  // const SOCKET_URL = 'http://127.0.0.1:4000/stream'

  // document.getElementById('guest').style.height = `calc(${window.innerHeight}px - 200px)`
  // document.getElementById('guest').style.overflowY = 'auto'
  const isHost = room.host_id === user.id
  let commElem = document.getElementsByClassName('room-comm')

  for (let i = 0; i < commElem.length; i++) {
    commElem[i].attributes.removeNamedItem('hidden')
  }

  if (user.id == 1779) {
    document.getElementById('checkDevice').style.display = 'none'
    document.getElementById('app').style.display = 'block'

    getSetUserStream((stream) => { })
    startCall()
  }

  let isActiveVideo = false
  let idActive = null
  var pc = []
  let streamHost = null
  let streamActive = null

  let socket = null

  var socketId = ''
  var myStream = ''
  var screen = ''
  var recording = false
  let muted = false

  //Get user video by default
  document.getElementById('startCall').addEventListener('click', function () {
    document.getElementById('checkDevice').style.display = 'none'
    document.getElementById('app').style.display = 'block'

    getSetUserStream((stream) => { })
    startCall()
  })

  function getSetUserStream(callback) {
    if (!window.myStream) {
      h.getUserFullMedia()
        .then((stream) => {
          //save my stream
          myStream = stream

          h.setLocalStream(stream)
          callback(stream)
        })
        .catch((e) => {
          console.error(`stream error: ${e}`)
        })
    } else {
      myStream = window.myStream
      h.setLocalStream(window.myStream)
      callback(window.myStream)
    }
  }

  function sendMsg(msg) {
    let data = {
      room: room.id,
      msg: msg,
      sender: `${user.fullName}`
    }

    //emit chat message
    socket.emit('chat', data)

    //add localchat
    h.addChat(data, 'local')
  }

  function init(createOffer, partnerName, isHost = false, user, idActive = null, isOnCamera) {
    console.log(isOnCamera)
    pc[partnerName] = new RTCPeerConnection(h.getIceServer())

    if (screen && screen.getTracks().length) {
      screen.getTracks().forEach((track) => {
        pc[partnerName].addTrack(track, screen) //should trigger negotiationneeded event
      })
    } else if (myStream) {
      myStream.getTracks().forEach((track) => {
        pc[partnerName].addTrack(track, myStream) //should trigger negotiationneeded event
      })
    } else {
      h.getUserFullMedia()
        .then((stream) => {
          myStream = stream

          stream.getTracks().forEach((track) => {
            pc[partnerName].addTrack(track, stream) //should trigger negotiationneeded event
          })

          h.setLocalStream(stream)
        })
        .catch((e) => {
          console.error(`stream error: ${e}`)
        })
    }

    //create offer
    if (createOffer) {
      pc[partnerName].onnegotiationneeded = async () => {
        let offer = await pc[partnerName].createOffer()

        await pc[partnerName].setLocalDescription(offer)

        socket.emit('sdp', { description: pc[partnerName].localDescription, to: partnerName, sender: socketId })
      }
    }

    //send ice candidate to partnerNames
    pc[partnerName].onicecandidate = ({ candidate }) => {
      socket.emit('ice candidates', { candidate: candidate, to: partnerName, sender: socketId })
    }

    //add
    pc[partnerName].ontrack = (e) => {
      let str = e.streams[0]

      if (document.getElementById(`${partnerName}-video`)) {
        streamHost = str
        document.getElementById(`${partnerName}-video`).srcObject = str
      } else {
        if (isHost) {
          document.getElementById(`video-host`).srcObject = str
        } else {
          if (document.getElementsByClassName(`${user._id}-video`).length) {
            document.getElementsByClassName(`${user._id}-video`)[0].srcObject = str
          } else {
            if (user.id !== 1779) {
              let newVid = document.createElement('video')
              newVid.id = `${partnerName}-video`
              newVid.controls = false
              newVid.playsInline = true
              newVid.srcObject = str
              newVid.autoplay = true
              newVid.className = `remote-video mirror-mode ${user._id}-video`
              let nameDiv = document.createElement('p')
              nameDiv.className = 'username'
              nameDiv.innerHTML = `${user.fullName}`
              nameDiv.id = `${partnerName}-name`

              let hand = document.createElement('i')
              hand.className = 'fa fa-hand-paper text-warning hand'
              hand.id = `${partnerName}-hand`
              hand.setAttribute('data', `${partnerName}`)
              hand.setAttribute('title', `${user.fullName} đang giơ tay`)
              hand.setAttribute('data-name', `${user.fullName}`)
              hand.style.display = 'none'

              //video controls elements
              let controlDiv = document.createElement('div')
              controlDiv.className = 'remote-video-controls'
              controlDiv.innerHTML = `<i class="fa fa-microphone text-white pr-3 mute-remote-mic muted-audio" title="Im lặng" data="${partnerName}"></i>
                    <i class="fa fa-expand text-white expand-remote-video" title="Mở rộng" ></i>`

              let vol = document.createElement('i')
              vol.className = 'fas fa-volume-up speaker-icon'
              vol.id = `${partnerName}-speaker`

              //create a new div for card
              let cardDiv = document.createElement('div')
              cardDiv.className = `card card-sm m-1`
              cardDiv.id = partnerName
              cardDiv.appendChild(newVid)
              cardDiv.appendChild(controlDiv)
              cardDiv.appendChild(nameDiv)
              cardDiv.appendChild(hand)
              cardDiv.appendChild(vol)

              // if (!isOnCamera) {
              //   document.getElementById('video-off-camera').appendChild(cardDiv)
              // } else {
              // }
              document.getElementById('guest').appendChild(cardDiv)

              h.adjustVideoElemSize()
            }
          }
        }
      }
    }

    pc[partnerName].onconnectionstatechange = (d) => {
      console.log('onconnectionstatechange', pc[partnerName].iceConnectionState)

      switch (pc[partnerName].iceConnectionState) {
        case 'disconnected':
          setTimeout(() => {
            if (pc[partnerName].iceConnectionState === 'disconnected') {
              h.closeVideo(partnerName)
            }
          }, 5000)
          break
        case 'failed':
          setTimeout(() => {
            if (pc[partnerName].iceConnectionState === 'disconnected') {
              h.closeVideo(partnerName)
            }
          }, 5000)
          break
        case 'closed':
          console.log('dong')

          h.closeVideo(partnerName)
          break
      }
    }

    pc[partnerName].onsignalingstatechange = (d) => {
      console.log('onsignalingstatechange', pc[partnerName].signalingState)

      switch (pc[partnerName].signalingState) {
        case 'closed':
          h.closeVideo(partnerName)
          break
      }
    }

    if (idActive) {
      setTimeout(() => {
        const cardHost = document.getElementById('card-host')
        const cardUser = document.getElementById(idActive)

        if (cardUser) {
          cardUser.classList.add('h-100')
          cardHost.classList.remove('h-100')
          document.getElementById('videos-host').appendChild(cardUser)
          const getIndexChildGusest = document.getElementById('guest').children

          if (getIndexChildGusest.length) {
            document.getElementById('guest').insertBefore(cardHost, getIndexChildGusest[0])
          } else {
            document.getElementById('guest').appendChild(cardHost)
          }
        }
      }, 1000)
    }
  }

  function shareScreen() {
    h.shareScreen()
      .then((stream) => {
        h.toggleShareIcons(true)

        //disable the video toggle btns while sharing screen. This is to ensure clicking on the btn does not interfere with the screen sharing
        //It will be enabled was user stopped sharing screen
        h.toggleVideoBtnDisabled(true)

        //save my screen stream
        screen = stream

        if (!isHost) {
          document.getElementById('local').srcObject = stream
        } else {
          document.getElementById('video-host').srcObject = stream
        }

        //share the new stream with all partners
        // document.getElementById()
        broadcastNewTracks(stream, 'video', false)

        //When the stop sharing button shown by the browser is clicked
        screen.getVideoTracks()[0].addEventListener('ended', () => {
          stopSharingScreen()
        })
      })
      .catch((e) => {
        console.error(e)
      })
  }

  function stopSharingScreen() {
    //enable video toggle btn
    h.toggleVideoBtnDisabled(false)

    return new Promise((res, rej) => {
      screen.getTracks().length ? screen.getTracks().forEach((track) => track.stop()) : ''

      res()
    })
      .then(() => {
        h.toggleShareIcons(false)
        broadcastNewTracks(myStream, 'video')

        if (!isHost) {
          document.getElementById('local').srcObject = myStream
        } else {
          document.getElementById('video-host').srcObject = myStream
        }
      })
      .catch((e) => {
        console.error(e)
      })
  }

  function broadcastNewTracks(stream, type, mirrorMode = true) {
    // h.setLocalStream(stream, mirrorMode);

    let track = type == 'audio' ? stream.getAudioTracks()[0] : stream.getVideoTracks()[0]

    for (let p in pc) {
      let pName = pc[p]

      if (typeof pc[pName] == 'object') {
        h.replaceTrack(track, pc[pName])
      }
    }
  }

  function toggleRecordingIcons(isRecording) {
    let e = document.getElementById('record')

    if (isRecording) {
      e.setAttribute('title', 'Stop recording')
      e.children[0].classList.add('text-danger')
      e.children[0].classList.remove('text-white')
    } else {
      e.setAttribute('title', 'Record')
      e.children[0].classList.add('text-white')
      e.children[0].classList.remove('text-danger')
    }
  }

  document.getElementById('chat-input-btn').addEventListener('click', (e) => {
    if (document.getElementById('chat-input').value.trim()) {
      sendMsg(document.getElementById('chat-input').value)

      setTimeout(() => {
        document.getElementById('chat-input').value = ''
      }, 50)
    }
  })

  //Chat textarea
  document.getElementById('chat-input').addEventListener('keypress', (e) => {
    if (e.which === 13 && e.target.value.trim()) {
      e.preventDefault()

      sendMsg(e.target.value)

      setTimeout(() => {
        e.target.value = ''
      }, 50)
    }
  })

  //When the video icon is clicked
  let isTurnOnVideo = true
  document.getElementById('toggle-video').addEventListener('click', async (e) => {
    e.preventDefault()
    let elem = document.getElementById('toggle-video')

    if (!isTurnOnVideo) {
      // turn on webcam
      myStream.getVideoTracks()[0].enabled = true
      isTurnOnVideo = true
      elem.children[0].classList.remove('fa-video-slash')
      elem.children[0].classList.add('fa-video')
      elem.setAttribute('title', 'Hide Video')

      let videoElement = document.getElementById(`local`)

      if (isHost) {
        videoElement = document.getElementById('video-host')
      }

      await startWebcamAgain(videoElement)

      // socket.emit('turnOnVideo', { to: socketId, isVideo: true, room: room.id, isHost: isHost })
    } else {
      //turn off webcam
      myStream.getVideoTracks()[0].enabled = false
      elem.children[0].classList.remove('fa-video')
      elem.children[0].classList.add('fa-video-slash')
      elem.setAttribute('title', 'Show Video')
      // close webcam
      // myStream.getVideoTracks()[0].stop()
      isTurnOnVideo = false
      // socket.emit('turnOffVideo', { to: socketId, isVideo: false, room: room.id, isHost: isHost })
    }

    broadcastNewTracks(myStream, 'video')
  })

  async function startWebcamAgain(element) {
    changeVideoDevice(
      window.localStorage.getItem('webcam'),
      (stream) => {
        myStream = stream
        element.srcObject = stream
      },
      {}
    )
  }

  //When the mute icon is clicked
  let isTurnOnAudio = true
  document.getElementById('toggle-mute').addEventListener('click', (e) => {
    e.preventDefault()

    let elem = document.getElementById('toggle-mute')

    if (!muted) {
      if (!isTurnOnAudio) {
        // turn on audio
        const track = myStream.getAudioTracks()

        for (let i = 0; i < track.length; i++) {
          track[i].enabled = true
        }

        isTurnOnAudio = true
        elem.classList.remove('fa-microphone-alt-slash')
        elem.classList.add('fa-microphone-alt')
        elem.setAttribute('title', 'Mute')
      } else {
        //turn off audio
        const track = myStream.getAudioTracks()

        for (let i = 0; i < track.length; i++) {
          track[i].enabled = false
        }

        isTurnOnAudio = false
        elem.classList.remove('fa-microphone-alt')
        elem.classList.add('fa-microphone-alt-slash')
        elem.setAttribute('title', 'Unmute')
      }
    } else {
      alert('Bạn không thể bật mic khi đang bị giảng viên cấm micro')
    }

    broadcastNewTracks(myStream, 'audio')
  })

  //When user clicks the 'Share screen' button
  document.getElementById('share-screen').addEventListener('click', (e) => {
    e.preventDefault()

    if (screen && screen.getVideoTracks().length && screen.getVideoTracks()[0].readyState != 'ended') {
      stopSharingScreen()
    } else {
      shareScreen()
    }
  })

  //When user choose to record own video
  if (document.getElementById('record-video')) {
    document.getElementById('record-video').addEventListener('click', () => {
      const currenDate = new Date()
      const outputPath =
        room.name +
        '-' +
        currenDate.getFullYear() +
        '-' +
        currenDate.getMonth() +
        '-' +
        currenDate.getDate() +
        '-' +
        currenDate.getHours() +
        ':' +
        currenDate.getMinutes() +
        '.mp4'

      if (!recording) {
        const endTime = moment(room.end_at, 'HH:mm:ss')
        const currentTime = moment()
        const timeRemaining = moment.duration(endTime.diff(currentTime))
        const timeRemainingInSeconds = timeRemaining.asSeconds()

        if (timeRemainingInSeconds + 1800 <= 0) {
          alert('Hết thời gian ghi hình!')

          return
        } else {
          const elapsedTimeInMilliseconds = timeRemainingInSeconds + 180 * 1000
          const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              url: window.location.href,
              outputPath: outputPath,
              auth: AUTH_RECORD,
              time: elapsedTimeInMilliseconds
            })
          }
          fetch(RECORD_URL + '/start', options)
            .then((res) => res.json())
            .then((data) => {
              document.getElementById('record-icon').classList.add('text-danger')
              document.getElementById('record-video').setAttribute('title', 'Dừng ghi hình')
              recording = true
            })
            .catch((error) => {
              console.error(error)
              alert('Server bị lỗi chưa thể ghi hình')
            })
        }
      } else {
        const outputPath =
          room.name +
          '-' +
          currenDate.getFullYear() +
          '-' +
          currenDate.getMonth() +
          '-' +
          currenDate.getDate() +
          '-' +
          currenDate.getHours() +
          ':' +
          currenDate.getMinutes() +
          '.mp4'
        const options = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            url: window.location.href,
            outputPath: outputPath,
            auth: AUTH_RECORD
          })
        }
        fetch(RECORD_URL + '/stop', options)
          .then((res) => res.json())
          .then((data) => {
            document.getElementById('record-icon').classList.remove('text-danger')
            document.getElementById('record-video').setAttribute('title', 'Ghi hình')
            recording = false
          })
          .catch((error) => {
            console.error(error)
            alert('Server bị lỗi chưa thể ghi hình')
          })
      }
    })
  }

  function startCall() {
    document.getElementById('video-demo').remove()
    socket = io.connect(SOCKET_URL, { secure: true })

    var audioTracks = myStream.getAudioTracks()
    var hasAudio = audioTracks.length > 0

    if (!isOnCamera) {
      document.getElementById('toggle-video').click()
    }

    if (hasAudio) {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)()
      const microphone = audioContext.createMediaStreamSource(myStream)
      const analyser = audioContext.createAnalyser()

      // Thiết lập các tham số cho bộ phân tích âm thanh
      analyser.fftSize = 32
      const bufferLength = analyser.frequencyBinCount
      const dataArray = new Uint8Array(bufferLength)

      function updateSpeakerIcon() {
        // Lấy giá trị biên độ của âm thanh
        analyser.getByteFrequencyData(dataArray)
        let averageAmplitude
        const speakerIcon = room.host_id == user.id ? document.getElementById('speaker-host') : null

        const vol = averageAmplitude / 255

        if (
          document.getElementById('toggle-mute') &&
          document.getElementById('toggle-mute').classList.contains('fa-microphone-alt-slash')
        ) {
          averageAmplitude = 0
        } else {
          averageAmplitude = Array.from(dataArray).reduce((acc, val) => acc + val, 0) / bufferLength
        }

        if (speakerIcon) {
          if (averageAmplitude <= 0) {
            speakerIcon.style.color = 'red'
            speakerIcon.classList.add('fa-volume-slash')
          } else if (averageAmplitude <= 40 && averageAmplitude > 0) {
            speakerIcon.style.color = 'green'
            speakerIcon.classList.remove('fa-microphone-alt')
            speakerIcon.classList.remove('fa-volume-up')
            speakerIcon.classList.add('fa-volume-down')
          } else {
            speakerIcon.style.color = '#ffcc00'
            speakerIcon.classList.remove('fa-microphone-alt')
            speakerIcon.classList.add('fa-volume-up')
            speakerIcon.classList.remove('fa-volume-down')
          }
        }

        socket.emit('audio', {
          audio: averageAmplitude,
          to: socketId,
          room: room.id,
          userId: user.id,
          isHost: user.id === room.host_id
        })

        // Lặp lại quá trình cập nhật sau mỗi khoảng thời gian nhất định
        requestAnimationFrame(updateSpeakerIcon)
      }

      // Kích hoạt quá trình cập nhật icon loa
      updateSpeakerIcon()

      // Kết nối microphone với bộ phân tích âm thanh
      microphone.connect(analyser)
    }

    socket.on('connect', () => {
      //set socketId
      socketId = socket.io.engine.id
      socket.emit('subscribe', {
        room: room.id,
        socketId: socketId,
        user: user,
        isHost: user.id === room.host_id,
        isOnCamera: isOnCamera
      })

      socket.on('new user', (data) => {
        console.log('new user', data)
        // document.getElementById('count-user').innerHTML = data.countUser
        socket.emit('newUserStart', {
          to: data.socketId,
          sender: socketId,
          isHost: isHost,
          user: user,
          room: room.id,
          isOnCamera: isOnCamera
        })
        pc.push(data.socketId)
        init(true, data.socketId, data.isHost, data.user, data.isOnCamera)
      })

      socket.on('newUserStart', (data) => {
        if (data.idActive) {
          isActiveVideo = true
          idActive = data.idActive
        }

        // document.getElementById('count-user').innerHTML = data.countUser

        pc.push(data.sender)
        init(false, data.sender, data.isHost, data.user, data.idActive, data.isOnCamera)
      })

      socket.on('ice candidates', async (data) => {
        data.candidate ? await pc[data.sender].addIceCandidate(new RTCIceCandidate(data.candidate)) : ''
      })

      socket.on('sdp', async (data) => {
        if (data.description.type === 'offer') {
          data.description
            ? await pc[data.sender].setRemoteDescription(new RTCSessionDescription(data.description))
            : ''

          let answer = await pc[data.sender].createAnswer()

          await pc[data.sender].setLocalDescription(answer)
          socket.emit('sdp', {
            description: pc[data.sender].localDescription,
            to: data.sender,
            sender: socketId
          })
        } else if (data.description.type === 'answer') {
          await pc[data.sender].setRemoteDescription(new RTCSessionDescription(data.description))
        }
      })

      socket.on('chat', (data) => {
        h.addChat(data, 'remote')
      })

      document.addEventListener('click', (e) => {
        if (e.target && e.target.classList.contains('mute-remote-mic')) {
          const id = e.target.getAttribute('data')

          if (e.target.classList.contains('fa-microphone')) {
            socket.emit('unmuted', { to: id, room: room.id })
          } else {
            socket.emit('muted', { to: id, room: room.id })
          }
        }

        if (e.target && e.target.classList.contains('hand')) {
          if (!isActiveVideo) {
            const id = e.target.getAttribute('data')

            if (room.host_id === user._id) {
              const cardHost = document.getElementById('card-host')
              const cardUser = document.getElementById(id)
              cardUser.classList.add('h-100')
              cardHost.classList.remove('h-100')
              document.getElementById('videos-host').appendChild(cardUser)
              const getIndexChildGusest = document.getElementById('guest').children

              if (getIndexChildGusest.length) {
                document.getElementById('guest').insertBefore(cardHost, getIndexChildGusest[0])
              } else {
                document.getElementById('guest').appendChild(cardHost)
              }

              document.getElementById(`${id}-hand`).style.display = 'none'
              isActiveVideo = true
              idActive = id
              socket.emit('onActiveVideo', {
                to: id,
                room: room.id
              })
            }
          } else {
            alert('Chỉ 1 người được phát biểu')
          }
        }
      })
      socket.on('onActiveVideo', (data) => {
        const { id } = data
        const cardHost = document.getElementById('card-host')
        const cardUser = document.getElementById(id)

        if (cardUser) {
          cardUser.classList.add('h-100')
          document.getElementById('videos-host').appendChild(cardUser)
        } else {
          const card = document.createElement('div')
          card.className = 'card card-sm card-video h-100'
          card.id = id
          const video = document.createElement('video')
          video.srcObject = myStream
          video.className = 'remote-video'
          video.autoplay = true
          video.muted = true
          card.appendChild(video)
          document.getElementById('videos-host').appendChild(card)
        }

        cardHost.classList.remove('h-100')
        const getIndexChildGusest = document.getElementById('guest').children

        if (getIndexChildGusest.length) {
          document.getElementById('guest').insertBefore(cardHost, getIndexChildGusest[0])
        } else {
          document.getElementById('guest').appendChild(cardHost)
        }

        if (document.getElementById(`${id}-hand`)) {
          document.getElementById(`${id}-hand`).style.display = 'none'
        }
      })

      if (document.getElementById('goLive')) {
        document.getElementById('goLive').addEventListener('click', function () {
          if (isActiveVideo) {
            const cardHost = document.getElementById('card-host')
            const cardUser = document.getElementById(idActive)

            cardHost.classList.add('h-100')

            if (cardUser) {
              cardUser.classList.remove('h-100')

              const getIndexChildGusest = document.getElementById('guest').children

              if (getIndexChildGusest.length) {
                document.getElementById('guest').insertBefore(cardUser, getIndexChildGusest[0])
              } else {
                document.getElementById('guest').appendChild(cardUser)
              }
            }

            document.getElementById('videos-host').appendChild(cardHost)

            socket.emit('unActiveVideo', {
              to: idActive,
              room: room.id
            })
            isActiveVideo = false
          } else {
            alert('Bạn đã ở vị trí đúng')
          }
        })
      }

      socket.on('onUnActiveVideo', (data) => {
        const cardHost = document.getElementById('card-host')
        const cardUser = document.getElementById(data.id)

        cardUser.classList.remove('h-100')
        cardHost.classList.add('h-100')

        document.getElementById('videos-host').appendChild(cardHost)

        if (socketId !== data.id) {
          const getIndexChildGusest = document.getElementById('guest').children

          if (getIndexChildGusest.length) {
            document.getElementById('guest').insertBefore(cardUser, getIndexChildGusest[0])
          } else {
            document.getElementById('guest').appendChild(cardUser)
          }
        } else {
          cardUser.remove()
        }
      })

      let onHand = false

      if (document.getElementById('toggle-hand')) {
        document.getElementById('toggle-hand').addEventListener('click', function () {
          if (onHand) {
            this.children[0].classList.remove('text-warning')
            socket.emit('unHand', { to: socketId, room: room.id })
            onHand = false
          } else {
            this.children[0].classList.add('text-warning')
            socket.emit('onHand', { to: socketId, room: room.id })
            onHand = true
          }
        })
      }

      socket.on(`muted`, (data) => {
        if (data.id == socketId) {
          document.getElementById('toggle-mute').classList.add('fa-microphone-alt-slash')
          myStream.getAudioTracks()[0].enabled = false
          muted = true
        } else {
        }
      })
      socket.on(`unmuted`, (data) => {
        if (data.id === socketId) {
          document.getElementById('toggle-mute').classList.remove('fa-microphone-alt-slash')
          myStream.getAudioTracks()[0].enabled = true
          muted = false
        }
      })

      socket.on(`onHand`, (data) => {
        const guest = document.getElementById('guest')
        const children = guest.children
        const video = document.getElementById(`${data.id}-video`).parentElement
        video.classList.add('mt-2')

        if (children.length) {
          guest.insertBefore(video, children[0])
        } else {
          guest.appendChild(video)
        }

        document.getElementById(`${data.id}-hand`).style.display = 'block'
      })
      socket.on(`unHand`, (data) => {
        document.getElementById(`${data.id}-hand`).style.display = 'none'
      })

      socket.on('vol', (data) => {
        let element = null
        const volume = 24 + data.audio * 0.2

        if (data.isHost) {
          element = document.getElementById('speaker-host')
        } else {
          element = document.getElementById(`${data.id}-speaker`)
        }

        if (element) {
          if (volume <= 24) {
            element.style.color = 'red'
            element.classList.add('fa-volume-slash')
          } else if (volume <= 40 && volume > 0) {
            element.style.color = 'green'
            element.classList.remove('fa-microphone-alt')
            element.classList.remove('fa-volume-up')
            element.classList.add('fa-volume-down')
          } else {
            element.style.color = '#ffcc00'
            element.classList.remove('fa-microphone-alt')
            element.classList.add('fa-volume-up')
            element.classList.remove('fa-volume-down')
          }
        }
      })

      socket.on('turnOffVideo', (data) => {
        let videoElement = document.getElementById(`${data.id}-video`)

        if (data.isHost) {
          videoElement = document.getElementById('video-host')
        }
      })

      socket.on('turnOnVideo', (data) => {
        if (data.isHost) {
          // document.getElementById('poster-host').remove()
        } else {
          // document.getElementById(`${data.id}-poster`).remove()
        }
      })
      socket.on('out', (data) => {
        console.log(data.id)
        h.closeVideo(data.id)
      })

      window.addEventListener('offline', (event) => {
        alert('Mất kết nối mạng')
      })
    })
  }
})
