const socket = io('/');
let myStream;
const videoGrid = document.getElementById('video-grid')
const myPeer = new Peer(undefined, {
  secure:true,
  host: 'webcam-video-chat.herokuapp.com',
  port: '443'
})
const myVideo = document.createElement('video')
myVideo.muted = true
const peers = {}
navigator.mediaDevices.getUserMedia({
  video: true,
  audio: true
}).then(stream => {
  addVideoStream(myVideo, stream)
    myStream=stream;
  myPeer.on('call', call => {
    call.answer(stream)
    const video = document.createElement('video')
    call.on('stream', userVideoStream => {
      addVideoStream(video, userVideoStream)
    })
  })

  socket.on('user-joined', userId => {
    console.log("User Joined",userId);
    // connectToNewUser(userId, stream)
  })
})


myPeer.on('open', id => {
  socket.emit('join-room', ROOM_ID, id)
})

function connectToNewUser(userId, stream) {
  const call = myPeer.call(userId, stream)
  const video = document.createElement('video')
  call.on('stream', userVideoStream => {
      console.log("Hurray");
    addVideoStream(video, userVideoStream)
  })
  call.on('close', () => {
    video.remove()
  })

}

function addVideoStream(video, stream) {
  video.srcObject = stream
  video.addEventListener('loadedmetadata', () => {
    video.play()
  })
  videoGrid.append(video)
}