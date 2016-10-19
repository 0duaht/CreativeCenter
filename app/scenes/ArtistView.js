import React, { Component } from 'react';
import Webview from 'components/webview';
import ApiConstants from 'constants/ApiConstants';
import Styles from 'styles'

export class ArtistView extends Component {
  render(){
    return (
      <Webview
        uri={`${ApiConstants.apiUrl}${ApiConstants.artistLogin}`}
        style={Styles.full}
      />
    )
  }
}