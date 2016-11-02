import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  gameView: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
    borderColor: '#eee',
    borderWidth: 0.5,
  },
  teamsView: {
    paddingHorizontal: 12,
    paddingTop: 12,
  },
  teamView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    borderWidth: 1,
    backgroundColor: '#fff',
    borderColor: 'rgba(0,0,0,0.1)',
    margin: 5,
    height: 150,
    padding: 15,
    shadowColor: '#ccc',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
  teamText: {
    fontFamily: 'Helvetica',
    color: 'rgba(144,30,27,.9)',
    fontWeight: 'bold',
    fontSize: 18,
    paddingBottom: 3,
  },
  lossTeamText: {
    fontFamily: 'Helvetica',
    color: 'rgba(144,30,27,.9)',
    fontSize: 18,
    paddingBottom: 3,
  },
  timeText: {
    fontFamily: 'Helvetica',
    color: '#888',
  },

  footerTimeText: {
    fontFamily: 'Helvetica',
    color: '#888',
    paddingLeft: 15,
    paddingTop: 5,
  },

  footerFieldText: {
    fontFamily: 'Helvetica',
    color: '#888',
    paddingLeft: 15,
    paddingTop: 10,
  },

  flipBaseView: {
    backgroundColor: '#eee',
    paddingHorizontal: 12,
    paddingTop: 3,
    paddingBottom: 9,
  },
  flipFrontView: {
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
  flipBackView: {
    backgroundColor: '#eee',
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
})
