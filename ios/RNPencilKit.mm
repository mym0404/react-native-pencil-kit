#import "RNPencilKit.h"

#import <react/renderer/components/RNPencilKitViewSpec/ComponentDescriptors.h>
#import <react/renderer/components/RNPencilKitViewSpec/EventEmitters.h>
#import <react/renderer/components/RNPencilKitViewSpec/Props.h>
#import <react/renderer/components/RNPencilKitViewSpec/RCTComponentViewHelpers.h>

#import "RCTFabricComponentsPlugins.h"

using namespace facebook::react;

@interface RNPencilKit () <RCTRNPencilKitViewProtocol>

@end

@implementation RNPencilKit {
  UIView* _view;
}

+ (ComponentDescriptorProvider)componentDescriptorProvider {
  return concreteComponentDescriptorProvider<RNPencilKitComponentDescriptor>();
}

- (instancetype)initWithFrame:(CGRect)frame {
  if (self = [super initWithFrame:frame]) {
    static const auto defaultProps = std::make_shared<const RNPencilKitProps>();
    _props = defaultProps;

    _view = [[UIView alloc] init];

    self.contentView = _view;
  }

  return self;
}

- (void)updateProps:(Props::Shared const&)props oldProps:(Props::Shared const&)oldProps {
  const auto& prev = *std::static_pointer_cast<RNPencilKitProps const>(_props);
  const auto& next = *std::static_pointer_cast<RNPencilKitProps const>(props);

  if (prev.alwaysBounceVertical ^ next.alwaysBounceVertical) {
  }

  [super updateProps:props oldProps:oldProps];
}

Class<RCTComponentViewProtocol> RNPencilKitCls(void) {
  return RNPencilKit.class;
}

@end
