/* eslint-disable no-inner-declarations */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import helpers from './helpers.js'

window.addEventListener('load', () => {
  //When the chat icon is clicked
  document.querySelector('#toggle-chat-pane').addEventListener('click', (e) => {
    let chatElem = document.querySelector('#chat-pane')
    let mainSecElem = document.querySelector('#main')
    // let hostBlock = document.querySelector('#host-block');

    if (chatElem.classList.contains('chat-opened')) {
      // chatElem.setAttribute('hidden', true);
      mainSecElem.classList.remove('col-md-9')
      mainSecElem.classList.add('col-md-12')
      // hostBlock.classList.remove('col-md-9');
      // hostBlock.classList.add('col-md-12');
      chatElem.classList.remove('chat-opened')
      chatElem.style.right = '-100vw'
    } else {
      // chatElem.attributes.removeNamedItem('hidden');
      chatElem.style.right = '0'

      mainSecElem.classList.remove('col-md-12')
      mainSecElem.classList.add('col-md-9')

      chatElem.classList.add('chat-opened')
    }

    //remove the 'New' badge on chat icon (if any) once chat is opened.
    setTimeout(() => {
      if (document.querySelector('#chat-pane').classList.contains('chat-opened')) {
        helpers.toggleChatNotificationBadge()
      }
    }, 300)
  })

  //When the video frame is clicked. This will enable picture-in-picture
  // document.getElementById('local').addEventListener('click', () => {
  //     if (!document.pictureInPictureElement) {
  //         document.getElementById('local').requestPictureInPicture()
  //             .catch(error => {
  //                 // Video failed to enter Picture-in-Picture mode.
  //                 console.error(error);
  //             });
  //     }

  //     else {
  //         document.exitPictureInPicture()
  //             .catch(error => {
  //                 // Video failed to leave Picture-in-Picture mode.
  //                 console.error(error);
  //             });
  //     }
  // });

  document.addEventListener('click', (e) => {
    if (e.target && e.target.classList.contains('expand-remote-video')) {
      helpers.maximiseStream(e)
    } else if (e.target && e.target.classList.contains('mute-remote-mic')) {
      helpers.singleStreamToggleMute(e)
    }
  })

  // navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
  //     video.srcObject = stream;
  // });

  // video.addEventListener("playing", () => {
  //     console.log(video.videoWidth);
  //     console.log(video.videoHeight);
  // });
})
