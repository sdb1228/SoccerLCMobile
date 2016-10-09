import React, { Component } from 'react'
const { object, bool } = React.PropTypes
import { View, ScrollView, StyleSheet } from 'react-native'
import { AdMobBanner, AdMobInterstitial } from 'react-native-admob'
import codePush from 'react-native-code-push'

import * as provider from '../providers/admob'
import style from '../styles/admob'
const debug = Debug('admob')

export default class AdmobContainer extends Component {
  static get propTypes () {
    return {
      containerStyle: object,
      hideAd: bool,
    }
  }

  constructor () {
    super()
    this.state = {
      bannerSize: 'smartBannerPortrait',
      containerHeight: 0,
    }

    this.handleLayout = this.handleLayout.bind(this)
    this.setBannerSize = this.setBannerSize.bind(this)
  }

  componentWillMount () {
    codePush.allowRestart()
    codePush.sync()
  }

  componentDidMount () {
    if (!this.props.hideAd) {
      if (global.__DEV__) {
        AdMobInterstitial.setTestDeviceID(provider.deviceID)
      }

      AdMobInterstitial.setAdUnitID(provider.adUnitID)

      AdMobInterstitial.addEventListener('interstitialDidLoad',
      () => debug('interstitialDidLoad event'))

      AdMobInterstitial.addEventListener('interstitialDidClose',
      this.interstitialDidClose)

      AdMobInterstitial.addEventListener('interstitialDidFailToLoad',
      () => debug('interstitialDidFailToLoad event'))

      AdMobInterstitial.addEventListener('interstitialDidOpen',
      () => debug('interstitialDidOpen event'))

      AdMobInterstitial.addEventListener('interstitialWillLeaveApplication',
      () => debug('interstitalWillLeaveApplication event'))

      AdMobInterstitial.requestAd((error) => error && debug(error))
    }
  }

  componentWillUnmount () {
    if (!this.props.hideAd) {
      AdMobInterstitial.removeAllListeners()
    }
  }

  interstitialDidClose () {
    if (!this.props.hideAd) {
      debug('interstitialDidClose event')
      AdMobInterstitial.requestAd((error) => error && debug(error))
    }
  }

  showInterstital () {
    if (!this.props.hideAd) {
      AdMobInterstitial.showAd((error) => error && debug(error))
    }
  }

  setBannerSize () {
    if (!this.props.hideAd) {
      const { bannerSize } = this.state
      this.setState({
        bannerSize: bannerSize === 'smartBannerPortrait'
        ? 'mediumRectangle' : 'smartBannerPortrait',
      })
    }
  }

  renderAd () {
    if (this.props.hideAd) {
      return null
    } else {
      return (
        <AdMobBanner
          style={style.ad}
          bannerSize={this.state.bannerSize}
          adUnitID={provider.adUnitID}
        />
      )
    }
  }

  handleLayout (e) {
    this.setState({
      containerHeight: e.nativeEvent.layout.height,
    })
  }

  render () {
    const containerStyle = StyleSheet.flatten([
      { height: this.state.containerHeight },
      style.content,
      this.props.containerStyle || {},
    ])

    return (
      <View style={style.view}>
        <ScrollView
          scrollEnabled={false}
          style={style.container}
          onLayout={this.handleLayout}>
          <View style={containerStyle}>
            {this.props.children}
          </View>
        </ScrollView>
        {this.renderAd()}
      </View>
    )
  }
}
