//import $ from 'jquery'
import {registerEvent, registerReaction, fireEvent, chkSt} from 'absevents'
import {sendGet, sendPut, sendPost} from './common/postoffice'

import {createRep} from './common/repFactory'
//import {createIndex, updateIndex} from './common/index-factory'

const name = 'deck'
createRep(name)
