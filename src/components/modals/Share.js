import React, { Component, PropTypes } from 'react'

export default class Share extends Component {
  getShareUrl(network) {
    const url      = 'http://mapofmetal.com'
    const title    = 'Map of Metal'
    const networks = {
      facebook:    `https://www.facebook.com/sharer.php?u=${url}`,
      twitter:     `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
      pinterest:   `https://pinterest.com/pin/create/bookmarklet/?url=${url}&description=${title}`,
      linkedin:    `https://www.linkedin.com/shareArticle?url=${url}&title=${title}`,
      reddit:      `https://reddit.com/submit?url=${url}&title=${title}`,
      stumbleupon: `http://www.stumbleupon.com/submit?url=${url}&title=${title}`,
      tumblr:      `https://www.tumblr.com/widgets/share/tool?canonicalUrl=${url}&title=${title}`,
      digg:        `http://digg.com/submit?url=${url}&title=${title}`
    }

    return networks[network]
  }

  render() {``
    const { close } = this.props
    const networks = [
      'facebook', 'twitter', 'pinterest',
      'linkedin', 'reddit', 'stumbleupon',
      'tumblr', 'digg'
    ]

    return (
      <div className='ModalWrapper'>
        <div className='Modal ShareModal'>
          <p className='Modal-title'>Share</p>

          <ul className='social'>
            { networks.map(network => (
              <li className={network}>
                <a key={network} href={this.getShareUrl(network)} target='_blank' rel='nofollow external noopener'></a>
              </li>
            ))}
          </ul>

          <div className='Modal-footer'>
            <p>for development news follow the project on <a href='https://github.com/patrickgalbraith/mapofmetal/' target='_blank' rel='nofollow external noopener'>github</a></p>
            <p><button className='Modal-close' onClick={close}>ok</button></p>
          </div>
        </div>
      </div>
    )
  }
}