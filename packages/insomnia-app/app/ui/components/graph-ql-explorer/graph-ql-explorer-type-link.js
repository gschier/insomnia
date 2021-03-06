// @flow
import * as React from 'react';
import { autoBindMethodsForReact } from 'class-autobind-decorator';
import { AUTOBIND_CFG } from '../../../common/constants';
import { GraphQLList, GraphQLNonNull } from 'graphql';
import type { GraphQLType } from 'graphql';

type Props = {
  onNavigate: (type: Object) => void,
  type: GraphQLType,
};

@autoBindMethodsForReact(AUTOBIND_CFG)
class GraphQLExplorerTypeLink extends React.PureComponent<Props> {
  _handleClick(e: MouseEvent) {
    e.preventDefault();
    const { onNavigate, type } = this.props;
    onNavigate(type);
  }

  render() {
    const { type, onNavigate } = this.props;

    if (type instanceof GraphQLList) {
      return (
        <React.Fragment>
          [
          <GraphQLExplorerTypeLink onNavigate={onNavigate} type={type.ofType} />]
        </React.Fragment>
      );
    }

    if (type instanceof GraphQLNonNull) {
      return (
        <React.Fragment>
          <GraphQLExplorerTypeLink onNavigate={onNavigate} type={type.ofType} />!
        </React.Fragment>
      );
    }

    return (
      <a href="#" onClick={this._handleClick} className="notice">
        {type.name}
      </a>
    );
  }
}

export default GraphQLExplorerTypeLink;
