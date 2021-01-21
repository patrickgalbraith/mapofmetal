import React from "react"
import { Component } from "react"

type Props = {
  close: () => void
}

const url = 'https://mapofmetal.com'
const title = 'Map of Metal'

const networks = {
  facebook: `https://www.facebook.com/sharer.php?u=${url}`,
  twitter: `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
  pinterest: `https://pinterest.com/pin/create/bookmarklet/?url=${url}&description=${title}`,
  linkedin: `https://www.linkedin.com/shareArticle?url=${url}&title=${title}`,
  reddit: `https://reddit.com/submit?url=${url}&title=${title}`,
  stumbleupon: `http://www.stumbleupon.com/submit?url=${url}&title=${title}`,
  tumblr: `https://www.tumblr.com/widgets/share/tool?canonicalUrl=${url}&title=${title}`,
  digg: `http://digg.com/submit?url=${url}&title=${title}`
}

type NetworkName = keyof typeof networks

export default class Share extends Component<Props> {
  getShareUrl(network: NetworkName): string {
    return networks[network]
  }

  render() {
    const { close } = this.props

    return <div className='ModalWrapper'>
      <div className='Modal ShareModal'>
        <p className='Modal-title'>Share</p>

        <ul className='social'>
          {Object.keys(networks).map(network =>
            <li key={network} className={network}>
              <a key={network} href={this.getShareUrl(network as NetworkName)} target='_blank' rel='nofollow external noopener'></a>
            </li>
          )}
        </ul>

        <div className='Modal-footer'>
          <p>for development news follow the project on <a href='https://github.com/patrickgalbraith/mapofmetal/' target='_blank' rel='nofollow external noopener'>github</a></p>
          <p><button className='Modal-close' onClick={close}>ok</button></p>
        </div>
      </div>
    </div>
  }
}