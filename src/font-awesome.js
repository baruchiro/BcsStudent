import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { config, library } from '@fortawesome/fontawesome-svg-core'
import {
    faGithub, faTwitter, faLinkedin,
    faFacebook, faStackOverflow, faDev, faMedium,
    faTelegram
} from '@fortawesome/free-brands-svg-icons'
import { faEnvelope, faRss } from '@fortawesome/free-solid-svg-icons'
import '@fortawesome/fontawesome-svg-core/styles.css'

config.autoAddCss = false;
library.add(
    faGithub, faTwitter, faLinkedin,
    faFacebook, faStackOverflow, faEnvelope,
    faRss, faDev, faMedium, faTelegram
)

export default function (Vue) {
    Vue.component('font-awesome', FontAwesomeIcon)
}
