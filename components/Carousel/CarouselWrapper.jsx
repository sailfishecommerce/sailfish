import React, { Component } from "react";
import PropTypes from "prop-types";
import { tns } from "tiny-slider/src/tiny-slider.module";
import "tiny-slider/dist/tiny-slider.css";

/**
 * Wrapper component to show carousel, controlling the lifecircle
 * methods and settings update.
 * @param {object} [props.settings={}]
 *
 * @returns {ReactElement}
 */
class CarouselWrapper extends Component {
  constructor(props) {
    super(props);

    this.state = {
      defaultSettings: {},
    };

    this.slider = null;
    this.build = this.build.bind(this);
    this.onClick = this.onClick.bind(this);
    this.loaded = 1;
  }

  onClick(event) {
    event.preventDefault();
    event.stopPropagation();

    // console.log(event.target);
    const info = this.slider.getInfo();
    if (this.props.onClick) this.props.onClick(info);
  }

  componentDidMount() {
    this.build(this.props.settings);
  }

  /** * Initialize the carousel plugin with new settings */
  build(settings = {}) {
    if (this.slider) this.slider.destroy();

    const mergedSettings = {
      ...this.state.defaultSettings,
      ...settings,
      container: this.ref,
    };

    this.slider = tns(mergedSettings);
  }

  componentWillUnmount() {
    if (this.slider) this.slider.destroy();
  }

  render() {
    const {
      settings,
      innerDivClassName,
      outerDivClassName,
      children,
      ...props
    } = this.props;

    return (
      <div className={outerDivClassName}>
        <div
          className={`relative home-slider ${innerDivClassName}`}
          ref={(ele) => (this.ref = ele)}
          onClick={this.onClick}
        >
          {children}
        </div>
      </div>
    );
  }
}

CarouselWrapper.propTypes = {
  settings: PropTypes.object,
  outerDivClassName: PropTypes.string,
  innerDivClassName: PropTypes.string,
};

export default CarouselWrapper;
