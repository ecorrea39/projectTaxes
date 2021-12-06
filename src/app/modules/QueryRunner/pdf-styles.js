import React from 'react';
import { StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      backgroundColor: '#FFFFFF'
    },
    body: {
      flexDirection: 'column',
      width: '100%'
    },
    title: {
      flexDirection: 'row'
    },
    titleText: {
      marginLeft: '12px',
      marginTop: '18px',
      fontSize: '16px',
      color: '#6697DE'
    },
    image: {
      height: '25px',
      width: '80px',
      marginLeft: '20px',
      marginTop: '10px'
    },
    generated: {
      width: '100%',
      textAlign: 'right',
      fontSize: '10px',
      marginTop: '22px',
      marginRight: '20px',
      color: '#000000'
    },
    headers: {
      flexDirection: 'row',
      width: '100%',
      marginTop: '12px',
      marginLeft: '12px',
      marginRight: '12px'
    },
    header: {
      fontSize: '12px',
      fontWeight: 'bold',
      color: '#FFFFFF',
      backgroundColor: '#A5A5A5',
      borderColor: '#585858',
      borderStyle: 'solid',
      borderWidth: '0.5px',
      marginLeft: '1px',
      paddingLeft: '5px',
      paddingRight: '5px'
    },
    content: {
      flexDirection: 'column',
      width: '100%'
    },
    dataRow: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      height: '24px',
      marginTop: '10px',
      marginLeft: '12px',
      marginRight: '12px'
    },
    data: {
      fontSize: '10px',
      color: '#585858',
      paddingLeft: '5px',
      paddingRight: '5px'
    }
});

export default styles;