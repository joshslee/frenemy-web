// NPM
import { StyleSheet, css } from 'aphrodite';

// Utils
import { Colors } from '../utils/colors';


const TEAM_MEMBERS = [
  {
    role: "Gameplay + CopyWriting",
    names: ["Slava Polonski"],
    href: "https://twitter.com/slavaxyz"
  },
  {
    role: "Data Engineering + Back-end development",
    names: ["Bastian Kälin", "Ágnes Kocsis"],
    href: "https://github.com/kalinbas",
    href2: "https://twitter.com/agnes0x",
  },
  {
    role: "Product Management / Art",
    names: ["Samuel He"],
    href: "https://twitter.com/samuelhezb"
  },
  {
    role: "Software Engineer",
    names: ["Joshua Lee"],
    href: "https://joshleebuilds.xyz"
  }
]

const CreditScreen = () => {
  return (
    <div className={css(styles.members)}>
      {TEAM_MEMBERS.map(member => (
        <div className={css(styles.member)}>
          <h4 className={css(styles.role)}>{member?.role}</h4>
          <h4 className={css(styles.name)}>{member?.names.map((name, i)=> (
            <a
              href={i === 0 ? member?.href : member?.href2}
              target="_blank"
              rel="noreferrer"
              className={css(styles.link)}
            >
              {name}
            </a>
            )
          )}</h4>
        </div>
      ))}
    </div>
  )
};


const styles = StyleSheet.create({

  members: {
    width: "100%",
    display: "grid",
    maxWidth: 1200,
    gridGap: 15,
    padding: "15px 20px",
    boxSizing: "border-box",
    gridTemplateColumns: "1fr 1fr",
  },
  member: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    height: 180
  },
  role: {
    margin: 0,
    textTransform: "uppercase",
    color: Colors.gray(0.8),
    fontSize: 20,
    lineHeight: 2,
    textShadow: `0px 0px 1px ${Colors.charcoal()}`
  },
  name: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    margin: 0,
    padding: 10,
    fontSize: 20,
    color: Colors.purple(),
    textShadow: `0px 0px 1px ${Colors.charcoal()}`,
    lineHeight: 2,

  },
  link: {
    textDecoration: "unset",
    color: Colors.purple(),
    ":hover": {
      textDecoration: "underline"
    }
  }
});

export default CreditScreen;
