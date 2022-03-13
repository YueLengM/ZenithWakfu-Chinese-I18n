// ==UserScript==
// @name         ZenithWakfu 汉化
// @namespace    yuelengm@gmail.com
// @version      1.0
// @description  配装站汉化
// @author       YueLeng_M
// @match        *://zenithwakfu.com/*
// @match        *://*.zenithwakfu.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=zenithwakfu.com
// @grant        none
// @require      https://cdn.jsdelivr.net/npm/jquery@3.2.1/dist/jquery.slim.min.js
// ==/UserScript==

const intervals = []
const observers = []
let path = null

const tableMain = { Féca: '守护 Féca', Osamodas: '召唤 Osamodas', Enutrof: '宝藏 Enutrof', Sram: '刺客 Sram', Xélor: '时法 Xélor', Ecaflip: '幸运猫 Ecaflip', Eniripsa: '治愈 Eniripsa', Iop: '骑士 Iop', Crâ: '弓箭 Crâ', Sadida: '植物 Sadida', Sacrieur: '狂战 Sacrieur', Pandawa: '熊猫 Pandawa', Roublard: '盗贼 Roublard', Zobal: '萨满 Zobal', Ouginak: '厄运狗 Ouginak', Steamer: '蒸汽 Steamer', Eliotrope: '雨果 Eliotrope', Huppermage: '光法 Huppermage', Dégâts: '输出', Soin: '治疗', Défensif: '坦克', Support: '辅助', Donjon: '副本', 'Boss Ultime': '世界BOSS', PvP: 'PvP', Facile: '简单', Moyen: '普通', Difficile: '困难', Public: '公开配装', Privé: '私密配装' }
const attrFr1 = { PdV: '生命', PA: '行动', PM: '移动', PW: '创生', BQ: '光能', Armure: '护甲', 'Armure reçue': '护甲获得', 'Armure donnée': '护甲给予', 'Maîtrise Eau': '水系伤害', 'Résistance Eau': '水系抗性', 'Maîtrise Terre': '土系伤害', 'Résistance Terre': '土系抗性', 'Maîtrise Air': '风系伤害', 'Résistance Air': '风系抗性', 'Maîtrise Feu': '火系伤害', 'Résistance Feu': '火系抗性', 'Maîtrise cumulée': '最高总和', 'Dommages Infligés': '最终伤害', 'Soins réalisés': '最终治疗', 'Coup Critique': '暴击', Parade: '格挡', Initiative: '先手', PO: '射程', Esquive: '闪避', Tacle: '锁定', Sagesse: '悟性', Prospection: '勘探', Contrôle: '统率', 'Art du barda': '装备熟练', Volonté: '意志', 'Maîtrise Critique': '暴击伤害', 'Résistance Critique': '暴击抗性', 'Maîtrise Dos': '背刺伤害', 'Résistance Dos': '背刺抗性', 'Maîtrise Mêlée': '近战伤害', 'Maîtrise Distance': '远程伤害', 'Maîtrise Monocible': '单体伤害', 'Maîtrise Zone': '范围伤害', 'Maîtrise Soin': '治疗强度', 'Maîtrise Berserk': '狂暴伤害' }
const attrFr2 = { 'Maîtrise élémentaire': '元素伤害', 'Maîtrise élémentaire aléatoire sur 1 élément': '1元素伤害', 'Maîtrise élémentaire aléatoire sur 2 éléments': '2元素伤害', 'Maîtrise élémentaire aléatoire sur 3 éléments': '3元素伤害', 'Résistance élémentaire': '元素抗性', 'Résistance élémentaire aléatoire sur 1 élément': '1元素抗性', 'Résistance élémentaire aléatoire sur 2 éléments': '2元素抗性', 'Résistance élémentaire aléatoire sur 3 éléments': '3元素抗性', '% Quantité Récolte': '% 资源收获' }
const attrEn1 = { HP: '生命', 'Health Points': '生命', AP: '行动力', 'max AP': '行动力上限', MP: '移动力', 'max MP': '移动力上限', WP: '创生力', 'max WP': '创生力上限', 'Armor received': '护甲获得', 'Armor given': '护甲给予', 'Elemental Mastery': '伤害', 'Elemental Resistance': '抗性', 'Critical Hit': '暴击', Block: '格挡', Initiative: '先手', Range: '射程', Dodge: '闪避', Lock: '锁定', Wisdom: '悟性', Prospecting: '勘探', Control: '统率', 'Kit Skill': '装备熟练', 'Force of Will': '意志', 'Critical Mastery': '暴击伤害', 'Critical Resistance': '暴击抗性', 'Rear Mastery': '背刺伤害', 'Rear Resistance': '背刺抗性', 'Melee Mastery': '近战伤害', 'Distance Mastery': '远程伤害', 'Single Target Mastery': '单体伤害', 'Area Mastery': '范围伤害', 'Healing Mastery': '治疗', 'Berserk Mastery': '狂暴伤害', 'random element': '种随机元素', 'random elements': '种随机元素', 'Mastery of': '伤害', 'Resistance to': '抗性', 'movement speed': '移动速度' }
const UI = { Options: '装备', Sorts: '技能', Deck: '栏位', Intelligence: '智慧', Force: '力量', Agilité: '敏捷', Chance: '幸运', Majeur: '核心', Récapitulatif: '总览', 'Mes runes': '符文', Enchantements: '附魔', Sublimations: '升华', Build: '配装' }

function log (s, ...c) {
  console.log('[Translater] ' + s, ...c)
}

(function () {
  'use strict'
  document.cookie = 'lang=en;domain=.zenithwakfu.com'
  setInterval(checkMode, 1000)
})()

function checkMode () {
  if (path !== document.location.pathname) {
    log('Path change detected')
    path = document.location.pathname
    stop()
    if (document.location.pathname.length <= 9) { Main() } else { Build() }
  }
}

function stop () {
  intervals.forEach(e => clearInterval(e))
  intervals.length = 0
  observers.forEach(e => e.disconnect())
  observers.length = 0
}

function search (text, lists) {
  for (const list of lists) {
    if (text in list) {
      return list[text]
    }
  }
  log('Unknown: %c"' + text + '"', 'color:orange')
  return text
}

function effectTrans (text) {
  if (/[a-zA-Z]/.test(text)) {
    if (text === ' Resistance') { return ' 抗性' }
    if (text === ' Mastery') { return ' 伤害' }

    let res = text.match(/^(\s*[^a-zA-Z]+\s)([\D\s]+)$/)
    if (res) { if (res[2] in attrEn1) { return res[1] + attrEn1[res[2]] } else if (res[2] in attrFr1) { return res[1] + attrFr1[res[2]] } }

    res = text.match(/^(\s*[^a-zA-Z]+\s)([\D\s]+?)(\s[^a-zA-Z]+\s)([\D\s]+?)$/)
    if (res) { if (res[2] in attrEn1 && res[4] in attrEn1) { return res[1] + attrEn1[res[2]] + res[3] + attrEn1[res[4]] } }

    res = text.match(/^\s*Damage:\s*\d+\s*$/)
    if (res) { return text.replace('Damage', '伤害') }
    res = text.match(/^\s*Heal:\s*\d+\s*$/)
    if (res) { return text.replace('Heal', '治疗') }

    log('Unknown: %c"' + text + '"', 'color:orange')
  }
  return text
}

function Main () {
  const $blocks = $('.zn-inner-block')
  const $headers = $('.zn-block-header span')
  const _result = $headers[0]
  intervals[0] = setInterval(() => {
    if ($($blocks[1]).find('.flex:eq(1)').children().length > 1) {
      clearInterval(intervals[0])
      log('Starting translate main')
      loop()
      one()
    }
  }, 500)

  function loop () {
    intervals[1] = setInterval(() => {
      _result.textContent = _result.textContent.replace(/ .*/, ' 个结果')
      const $builds = $($blocks[0]).children('a').children().children(':even:not(.transed)')
      if ($builds) {
        $builds.addClass('transed')
        $builds.find('[class="zn-title"]>span').toArray().forEach(e => { e.textContent = e.textContent.replace(/\[.*\.(.*)\]/, '[$1 级]') })
        $builds.find('.text-subtitle>span').toArray().forEach(e => { e.textContent = e.textContent.replace(/.*: {2}(\d+)-(\d+)-(\d+)/, '创建于: $3-$2-$1') })
      }
    }, 500)
  }

  function one () {
    $headers[1].textContent = '创建配装'
    $headers[2].textContent = '搜索'
    for (let i = 1; i < 3; i++) {
      const $title = $($('.zn-inner-block')[i]).find('.zn-title>span')
      $title[0].textContent = '定位'
      $title[1].textContent = '适用'
      $title[2].textContent = '成本'
    }
    const $p = $($('.zn-inner-block')[1]).find('p')
    $p[0].textContent = '配装名'
    $p[1].textContent = '等级'
    $p.parent().removeClass('w-1/6')
    $($('.zn-inner-block')[1]).children().children('button').find('.MuiButton-label')[0].childNodes[0].nodeValue = '创建配装'
    $($('.zn-inner-block')[2]).find('p:first')[0].textContent = '配装名'

    const _level = $($('.zn-inner-block')[2]).find('p:eq(1)')[0]
    _level.textContent = _level.textContent.replace(/.* \(/, '等级 (')
    observers[0] = new MutationObserver(() => { _level.textContent = _level.textContent.replace(/.* \(/, '等级 (') })
    observers[0].observe($($('.zn-inner-block')[2]).find('input[type=hidden]')[0], { attributes: true })

    observers[1] = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.addedNodes.length > 0) {
          mutation.addedNodes.forEach(node => {
            const $node = $(node)
            if ($node.hasClass('MuiTooltip-popper')) {
              const old = $node.children()[0].childNodes[0].nodeValue
              $node.children()[0].childNodes[0].nodeValue = tableMain[old]

              if (old === 'Public' || old === 'Privé') {
                if (observers[2]) { observers[2].disconnect() }
                observers[2] = new MutationObserver(mutations => {
                  mutations.forEach(mutation => {
                    const v = mutation.target.nodeValue
                    if (v === 'Public' || v === 'Privé') { mutation.target.nodeValue = tableMain[mutation.target.nodeValue] }
                  })
                })
                observers[2].observe($node[0], { characterData: true, subtree: true })
              }
            }
          }
          )
        }
      })
    })
    observers[1].observe($('body')[0], { childList: true })
  }
}

function Build () {
  intervals[0] = setInterval(() => {
    if (!$('.app').children().hasClass('loader')) {
      clearInterval(intervals[0])
      log('Starting translate build')
      loop()
      one()
    }
  }, 500)

  function loop () { }

  function one () {
    const $builder = $('.zn-builder').children()
    const $tabs = $($builder[1]).find('span')
    $tabs[0].textContent = '搜索'
    $tabs[1].textContent = '技能'
    $tabs[2].textContent = '能力'
    $tabs[3].textContent = '附魔'
    $tabs[4].textContent = '总览'

    const $middle = $($builder[2]).children()
    const $left = $($middle[0]).find('.stats-body-name')
    $left.toArray().forEach(e => { e.textContent = search(e.textContent, [attrFr1]) })

    const $right = $($middle[1]).children()

    $right.find('.zn-block-header').toArray().forEach(e => {
      if ($(e).hasClass('flex-wrap')) {
        $(e).children('span')[0].textContent = UI[$(e).children()[0].textContent]
      } else {
        $(e).css('word-break', 'keep-all')
        e.childNodes[0].nodeValue = UI[e.childNodes[0].nodeValue]
      }
    })

    // 装备
    const $t1Panel = $($right[0]).children().children(':first')
    const $t1Titles = $t1Panel.find('p')
    $t1Titles[0].textContent = '物品名'
    $t1Titles[2].textContent = '稀有度'
    $t1Titles[3].textContent = '装备类型'
    $t1Titles[4].textContent = '属性'

    const $t1Btns = $t1Panel.find('.MuiButton-label')
    $t1Btns[0].textContent = '清空筛选'
    $t1Btns[1].textContent = '搜索'

    const _t1Lv = $('.zn-builder .middle-side .inner-tab:first>div>div:first p:eq(1)')[0]
    _t1Lv.textContent = _t1Lv.textContent.replace(/.* \(/, '等级 (')
    observers[0] = new MutationObserver(() => { _t1Lv.textContent = _t1Lv.textContent.replace(/.* \(/, '等级 (') })
    observers[0].observe($(_t1Lv).next().find('input[type=hidden]')[0], { attributes: true })

    const $stat = $('.statistic-filters>div:first')
    observers[1] = new MutationObserver(mutations => {
      if (mutations[0].addedNodes.length === 1) {
        $(mutations[0].addedNodes[0]).find('.flex.items-center').toArray().forEach(
          e => {
            $(e.childNodes[0]).removeAttr('alt')
            e.childNodes[1].nodeValue = '\xa0' + (e.childNodes[1].nodeValue.startsWith('-') ? '减' : '') + search(e.childNodes[1].nodeValue.replace(/^-/, ''), [attrFr1, attrFr2])
          })
      }
    })
    observers[1].observe($stat[0], { childList: true })

    observers[2] = new MutationObserver(() => {
      const $lvs = $('.item-result').find('.item-lvl:not(.transed)')
      $lvs.addClass('transed')
      $lvs.toArray().forEach(e => {
        e.childNodes[0].nodeValue = '等级 '
      })

      const $eqs = $('.item-result').find('.tooltip-effect:not(.transed)')
      $eqs.addClass('transed')
      if ($eqs.length > 0) {
        $eqs.toArray().forEach(e => {
          $(e).children().toArray().forEach(e => {
            e.childNodes.forEach(node => {
              if (node.nodeName === '#text' && node.length > 0) {
                node.nodeValue = effectTrans(node.nodeValue)
              }
            })
          })
        })
      }
    })
    observers[2].observe($('.item-result')[0], { childList: true, subtree: true })

    // tooltip
    observers[3] = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.addedNodes.length === 1) {
          const $node = $(mutation.addedNodes[0])
          if ($node.find('.item-stats,.tooltip-main.__block.__as-popup').length > 0) {
            const $stats = $node.find('.item-stats,.tooltip-main.__block.__as-popup')
            let sublimations = false
            if ($stats.find('.tooltip-header .relative img').attr('src').includes('/sublimations/')) {
              sublimations = true
            }
            const $lvl = $stats.find('.tooltip-header .item-inner-frame-information>div')
            if ($lvl.length === 1) {
              $lvl[0].childNodes[2].nodeValue = '等级 '
            }
            if (!sublimations) {
              const $effect = $stats.find('.tooltip-effect,.spell-effect').children()
              $effect.toArray().forEach(e => {
                e.childNodes.forEach(node => {
                  if (node.nodeName === '#text' && node.length > 0) {
                    node.nodeValue = effectTrans(node.nodeValue)
                  }
                })
              })
            }
          }
        }
      })
    })
    observers[3].observe($('body')[0], { childList: true })
  }
}
