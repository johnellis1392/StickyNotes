import React, { Component } from "react"
// import PropTypes from "prop-types"
import * as d3 from "d3"


import styles from "./Piano.scss"



/**
 * Piano
 * Taken from example here:
 * https://bl.ocks.org/mbostock/ca03fd621b93c2517b0a708c6b8e0c0a
 */
export class Piano extends Component {
  constructor() {
    super()
    this.state = {
      width: 0,
      height: 0,
    }
  }

  // Input Element Ref
  inputRef = null


  static propTypes = {
    // TODO
  }

  static defaultProps = {}


  // Retrieve raw domnode width on mount
  componentDidMount() {
    // const { offsetWidth, offsetHeight } = this.inputRef
    // const outerRadius = offsetHeight / 2 - 30
    const { width, height } = this.inputRef.getBoundingClientRect()
    const outerRadius = height / 2 - 30
    const innerRadius = outerRadius - 120

    this.setState({
      // width: offsetWidth,
      // height: offsetHeight,
      width,
      height,
      outerRadius,
      innerRadius,
    }, () => {
      // const { width, height } = this.state
      const container = d3.select(this.inputRef)
      container
        .append("g")
        .attr("transform", `translate(${width / 2}, ${height / 2})`)

      const over = "ontouchstart" in window ? "touchstart" : "mouseover"
      const out = "ontouchstart" in window ? "touchend" : "mouseout"
      const keys = this._renderKeys(over, out)
      this._setupAudioContext(keys, over)
    })
  }


  // Get reference to element
  _container = () => {
    return d3.select(this.inputRef).select("g")
  }



  _setupAudioContext = (keys, over) => {
    const AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.oAudioContext
    if (!AudioContext) return console.error("AudioContext not supported") // eslint-disable-line
    if (!OscillatorNode.prototype.start) OscillatorNode.prototype.start = OscillatorNode.prototype.noteOn
    if (!OscillatorNode.prototype.stop) OscillatorNode.prototype.stop = OscillatorNode.prototype.noteOff

    const context = new AudioContext()
    keys.on(`${over}.beep`, (d) => {
      const now = context.currentTime
      const oscillator = context.createOscillator()
      const gain = context.createGain()

      oscillator.type = "square"
      oscillator.frequency.value = d.frequency

      gain.gain.linearRampToValueAtTime(0.0, now + 0.0)
      // gain.gain.linearRampToValueAtTime(0.6, now + 0.1)
      gain.gain.linearRampToValueAtTime(0.1, now + 0.1)
      gain.gain.linearRampToValueAtTime(0.0, now + 1.0)

      oscillator.connect(gain)
      gain.connect(context.destination)
      oscillator.start(0)
      setTimeout(() => oscillator.stop(), 1500)
    })
  }



  _renderKeys = (over, out) => {
    const container = this._container()
    const { outerRadius, innerRadius } = this.state


    const arc = d3.arc()
      .cornerRadius(4)
      .padRadius(outerRadius)
      .innerRadius((d) => d.sharp ? innerRadius + (outerRadius - innerRadius) * 0.3 : innerRadius)

    const pie = d3.pie()
      .startAngle(-Math.PI)
      .endAngle(Math.PI)
      .value(() => 1)
      .sort(null)


    // .classed("key", true)
    // .classed("key--black", (d) => d.sharp)
    // .classed("key--white", (d) => !d.sharp)

    const keys = container.selectAll("path")
      .data(this._sharpen(pie(this._repeat(["C", "D", "E", "F", "G", "A", "B"], 6 * 4))))
      .enter()
      .append("path")
      .each((d) => d.outerRadius = outerRadius - 10)
      .classed(styles.key, true)
      .classed(styles.black, (d) => d.sharp)
      .classed(styles.white, (d) => !d.sharp)
      .attr("d", arc)
      // .on(over, this._arcTween(arc, outerRadius, 0))
      // .on(out, this._arcTween(arc, outerRadius - 10, 150))
      .on(over, this._arcTween(arc, outerRadius, 0))
      .on(out, this._arcTween(arc, outerRadius - 10, 150))

    return keys
  }


  // Needs to be unbound for `this` to work
  _arcTween(arc, outerRadius, delay) {
    return () => {
      d3.event.preventDefault()
      d3.select(this)
        .transition()
        .delay(delay)
        .attrTween("d", (d) => {
          // const elementRadius = d.outerRadius
          const elementRadius = 0
          const i = d3.interpolate(elementRadius, outerRadius)
          return (t) => {
            d.outerRadius = i(t)
            return arc(d)
          }
        })
    }
  }


  _repeat = (notes, n) => {
    return d3.merge(d3.range(n).map(() => notes))
  }


  _sharpen = (keys) => {
    const keyWidth = Math.PI * 2 / keys.length
    for (let i = 0, n = keys.length - 1, k; i < n; ++i) {
      if (/[CDFGA]/.test((k = keys[i]).data)) {
        keys.splice(++i, 0, {
          startAngle: k.startAngle + keyWidth * 0.65,
          endAngle: k.endAngle + keyWidth * 0.35,
          sharp: true,
        })
        n++
      }
    }

    for (let i = 0, n = keys.length; i < n; ++i) {
      keys[i].sharp = !!keys[i].sharp
      keys[i].frequency = 440 * Math.pow(2, (i % 72 - 9) / 12 - 2)
    }

    return keys.sort((a, b) => a.sharp - b.sharp)
  }


  render() {
    const props = {
      className: styles.container,
    }

    return (
      <svg ref={input => this.inputRef = input} {...props}>
        {/* TODO */}
      </svg>
    )
  }
}


export default Piano
