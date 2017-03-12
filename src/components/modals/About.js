import React, { Component, PropTypes } from 'react'

export default class About extends Component {
  render() {
    const { close } = this.props

    const external = {
      target: '_blank',
      rel:    'nofollow external noopener'
    }

    const external_dofollow = Object.assign({}, external, {
      rel: 'dofollow external noopener'
    })

    return (
      <div className='ModalWrapper'>
        <div className='Modal AboutModal'>
          <p className='Modal-title'>About</p>

          <p className='credit pat'>created by: <strong>PATRICK GALBRAITH</strong> <a href='http://www.pjgalbraith.com' {...external_dofollow}>(www.pjgalbraith.com)</a></p>
          <p className='credit nick'>metal historian: <strong>NICK GRANT</strong></p>

          <div className='testers'>
            <p>special thanks to the following testers</p>
            <ul>
              <li>NICK GRANT</li>
              <li>BEN GALBRAITH</li>
              <li>LUIS WILLIAMSON</li>
              <li>LEIGH COSMA</li>
            </ul>
          </div>

          <div className='resources'>
            <p>this site would not be possible without the following resources</p>
            <ul>
              <li><a href='' {...external}>YOUTUBE.COM</a></li>
              <li><a href='' {...external}>ENCYLOPEDIA METALLUM</a></li>
              <li><a href='' {...external}>WIKIPEDIA</a></li>
              <li><a href='' {...external}>METAL A HEADBANGERS JOURNEY</a></li>
            </ul>
          </div>

          <p className='special-thanks'>SPECIAL THANKS TO ALL THE METAL BANDS</p>
          <p className='feedback'>FEEDBACK? <a href='https://github.com/patrickgalbraith/mapofmetal/issues' {...external}>SUBMIT HERE</a></p>
          <p className='youtube-notice'>no music is hosted on this website, please <a href='https://www.youtube.com/yt/copyright/' {...external}>contact youtube</a> to file a copyright notice</p>

          <div className='Modal-footer'>
            <button className='Modal-close' onClick={close}>ok</button>
          </div>
        </div>
      </div>
    )
  }
}