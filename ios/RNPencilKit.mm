#import "RNPencilKit.h"

#import <react/renderer/components/RNPencilKitSpec/ComponentDescriptors.h>
#import <react/renderer/components/RNPencilKitSpec/EventEmitters.h>
#import <react/renderer/components/RNPencilKitSpec/Props.h>
#import <react/renderer/components/RNPencilKitSpec/RCTComponentViewHelpers.h>

#import "RCTFabricComponentsPlugins.h"

using namespace facebook::react;

static inline const std::shared_ptr<const RNPencilKitEventEmitter>
getEmitter(const SharedViewEventEmitter emitter) {
  return std::static_pointer_cast<const RNPencilKitEventEmitter>(emitter);
}

@interface RNPencilKit () <RCTRNPencilKitViewProtocol, PKCanvasViewDelegate, PKToolPickerObserver>

@end

@implementation RNPencilKit {
  PKCanvasView* _Nonnull _view;
  PKToolPicker* _Nullable _toolPicker;
}

- (instancetype)initWithFrame:(CGRect)frame {
  if (self = [super initWithFrame:frame]) {
    static const auto defaultProps = std::make_shared<const RNPencilKitProps>();
    _props = defaultProps;

    _view = [[PKCanvasView alloc] initWithFrame:frame];
    _view.delegate = self;
    _toolPicker = [[PKToolPicker alloc] init];
    [_toolPicker addObserver:_view];
    [_toolPicker addObserver:self];
    [_toolPicker setVisible:YES forFirstResponder:_view];
    self.contentView = _view;
  }

  return self;
}

- (void)dealloc {
  [_toolPicker removeObserver:_view];
  [_toolPicker removeObserver:self];
}

- (void)updateProps:(Props::Shared const&)props oldProps:(Props::Shared const&)oldProps {
  const auto& prev = *std::static_pointer_cast<RNPencilKitProps const>(_props);
  const auto& next = *std::static_pointer_cast<RNPencilKitProps const>(props);

  if (prev.alwaysBounceVertical ^ next.alwaysBounceVertical)
    _view.alwaysBounceVertical = next.alwaysBounceVertical;

  if (prev.alwaysBounceHorizontal ^ next.alwaysBounceHorizontal)
    _view.alwaysBounceHorizontal = next.alwaysBounceHorizontal;

  if (prev.drawingPolicy != next.drawingPolicy)
    _view.drawingPolicy = next.drawingPolicy == RNPencilKitDrawingPolicy::Anyinput
                              ? PKCanvasViewDrawingPolicyAnyInput
                          : next.drawingPolicy == RNPencilKitDrawingPolicy::Default
                              ? PKCanvasViewDrawingPolicyDefault
                              : PKCanvasViewDrawingPolicyPencilOnly;

  if (prev.isRulerActive ^ next.isRulerActive)
    [_view setRulerActive:next.isRulerActive];

  if (prev.isOpaque ^ next.isOpaque)
    [_view setOpaque:next.isOpaque];

  if (prev.backgroundColor ^ next.backgroundColor) {
    [_view setBackgroundColor:intToColor(next.backgroundColor)];
  }

  [super updateProps:props oldProps:oldProps];
}

- (void)clear {
  NSLog(@"clear");
  [_view setDrawing:[[PKDrawing alloc] init]];
}

- (void)showToolPicker {
  [_view becomeFirstResponder];
}
- (void)hideToolPicker {
  [_view resignFirstResponder];
}
- (void)redo {
  [_view.undoManager redo];
}

- (void)undo {
  [_view.undoManager undo];
}

- (void)saveDrawing:(NSString*)path {
  NSData* data = [_view.drawing dataRepresentation];
  NSError* error = nil;
  [data writeToURL:[[NSURL alloc] initFileURLWithPath:path]
           options:NSDataWritingAtomic
             error:&error];
  if (error) {
    getEmitter(_eventEmitter)->onSaveDrawing({.success = false});
  } else {
    getEmitter(_eventEmitter)
        ->onSaveDrawing(
            {.success = true, .base64 = [[data base64EncodedStringWithOptions:0] UTF8String]});
  }
}

- (void)loadDrawing:(NSString*)path {
  NSURL* url = [[NSURL alloc] initFileURLWithPath:path];
  if (![[NSFileManager defaultManager] fileExistsAtPath:[url path]]) {
    getEmitter(_eventEmitter)->onLoadDrawing({.success = false});
    return;
  }

  NSData* data = [[NSData alloc] initWithContentsOfURL:url];
  BOOL result = [self loadWithData:data];
  getEmitter(_eventEmitter)->onLoadDrawing({.success = result});
}

- (void)getBase64Data {
  getEmitter(_eventEmitter)
      ->onGetBase64Data({.success = true,
                         .base64 = [[_view.drawing.dataRepresentation
                             base64EncodedStringWithOptions:0] UTF8String]});
}

- (void)loadBase64Data:(NSString*)base64 {
  NSData* data =
      [[NSData alloc] initWithBase64EncodedString:base64
                                          options:NSDataBase64DecodingIgnoreUnknownCharacters];
  BOOL result = [self loadWithData:data];
  getEmitter(_eventEmitter)->onLoadBase64({.success = result});
}

- (BOOL)loadWithData:(NSData*)data {
  if (!data) {
    return NO;
  }
  NSError* error = nil;
  PKDrawing* drawing = [[PKDrawing alloc] initWithData:data error:&error];
  if (error || !drawing) {
    return NO;
  } else {
    [_view setDrawing:drawing];
    [_view.undoManager removeAllActions];
    return YES;
  }
}

- (void)setTool:(NSString*)toolType width:(double)width color:(NSInteger)color {
  std::string tool = [toolType UTF8String];
  BOOL isWidthValid = width != 0;
  BOOL isColorValid = color != 0;
  double defaultWidth = 1;
  UIColor* defaultColor = [UIColor blackColor];
  if (tool == "pen") {
    _toolPicker.selectedTool = _view.tool =
        [[PKInkingTool alloc] initWithInkType:PKInkTypePen
                                        color:isColorValid ? intToColor(color) : defaultColor
                                        width:isWidthValid ? width : defaultWidth];
  }
  if (tool == "pencil") {
    _toolPicker.selectedTool = _view.tool =
        [[PKInkingTool alloc] initWithInkType:PKInkTypePencil
                                        color:isColorValid ? intToColor(color) : defaultColor
                                        width:isWidthValid ? width : defaultWidth];
  }
  if (tool == "marker") {
    _toolPicker.selectedTool = _view.tool =
        [[PKInkingTool alloc] initWithInkType:PKInkTypeMarker
                                        color:isColorValid ? intToColor(color) : defaultColor
                                        width:isWidthValid ? width : defaultWidth];
  }
  if (@available(iOS 17.0, *)) {
    if (tool == "monoline") {
      _toolPicker.selectedTool = _view.tool =
          [[PKInkingTool alloc] initWithInkType:PKInkTypeMonoline
                                          color:isColorValid ? intToColor(color) : defaultColor
                                          width:isWidthValid ? width : defaultWidth];
    }
    if (tool == "fountainPen") {
      _toolPicker.selectedTool = _view.tool =
          [[PKInkingTool alloc] initWithInkType:PKInkTypeFountainPen
                                          color:isColorValid ? intToColor(color) : defaultColor
                                          width:isWidthValid ? width : defaultWidth];
    }
    if (tool == "watercolor") {
      _toolPicker.selectedTool = _view.tool =
          [[PKInkingTool alloc] initWithInkType:PKInkTypeWatercolor
                                          color:isColorValid ? intToColor(color) : defaultColor
                                          width:isWidthValid ? width : defaultWidth];
    }
    if (tool == "crayon") {
      _toolPicker.selectedTool = _view.tool =
          [[PKInkingTool alloc] initWithInkType:PKInkTypeCrayon
                                          color:isColorValid ? intToColor(color) : defaultColor
                                          width:isWidthValid ? width : defaultWidth];
    }
  }

  if (tool == "eraserVector") {
    if (@available(iOS 16.4, *)) {
      _toolPicker.selectedTool = _view.tool =
          [[PKEraserTool alloc] initWithEraserType:PKEraserTypeVector
                                             width:isWidthValid ? width : defaultWidth];
    } else {
      _toolPicker.selectedTool = _view.tool =
          [[PKEraserTool alloc] initWithEraserType:PKEraserTypeVector];
    }
  }
  if (tool == "eraserBitmap") {
    if (@available(iOS 16.4, *)) {
      _toolPicker.selectedTool = _view.tool =
          [[PKEraserTool alloc] initWithEraserType:PKEraserTypeBitmap
                                             width:isWidthValid ? width : defaultWidth];
    } else {
      _toolPicker.selectedTool = _view.tool =
          [[PKEraserTool alloc] initWithEraserType:PKEraserTypeBitmap];
    }
  }
  if (@available(iOS 16.4, *)) {
    if (tool == "eraserFixedWidthBitmap") {
      _toolPicker.selectedTool = _view.tool =
          [[PKEraserTool alloc] initWithEraserType:PKEraserTypeFixedWidthBitmap
                                             width:isWidthValid ? width : defaultWidth];
    }
  }
}

@end

@implementation RNPencilKit (PKCanvasviewDelegate)
- (void)canvasViewDidBeginUsingTool:(PKCanvasView*)canvasView {
  if (auto e = getEmitter(_eventEmitter)) {
    e->onCanvasViewDidBeginUsingTool({});
  }
}
- (void)canvasViewDrawingDidChange:(PKCanvasView*)canvasView {
  if (auto e = getEmitter(_eventEmitter)) {
    e->onCanvasViewDrawingDidChange({});
  }
}
- (void)canvasViewDidEndUsingTool:(PKCanvasView*)canvasView {
  if (auto e = getEmitter(_eventEmitter)) {
    e->onCanvasViewDidEndUsingTool({});
  }
}
- (void)canvasViewDidFinishRendering:(PKCanvasView*)canvasView {
  if (auto e = getEmitter(_eventEmitter)) {
    e->onCanvasViewDidFinishRendering({});
  }
}
@end

@implementation RNPencilKit (PKToolPickerObserver)
- (void)toolPickerVisibilityDidChange:(PKToolPicker*)toolPicker {
  if (auto e = getEmitter(_eventEmitter)) {
    e->onToolPickerVisibilityDidChange({});
  }
}
- (void)toolPickerSelectedToolDidChange:(PKToolPicker*)toolPicker {
  if (auto e = getEmitter(_eventEmitter)) {
    e->onToolPickerSelectedToolDidChange({});
  }
}
- (void)toolPickerFramesObscuredDidChange:(PKToolPicker*)toolPicker {
  if (auto e = getEmitter(_eventEmitter)) {
    e->onToolPickerFramesObscuredDidChange({});
  }
}
- (void)toolPickerIsRulerActiveDidChange:(PKToolPicker*)toolPicker {
  if (auto e = getEmitter(_eventEmitter)) {
    e->onToolPickerIsRulerActiveDidChange({});
  }
}
@end

@implementation RNPencilKit (ReactNative)
- (void)handleCommand:(const NSString*)commandName args:(const NSArray*)args {
  RCTRNPencilKitHandleCommand(self, commandName, args);
}

+ (ComponentDescriptorProvider)componentDescriptorProvider {
  return concreteComponentDescriptorProvider<RNPencilKitComponentDescriptor>();
}

Class<RCTComponentViewProtocol> RNPencilKitCls(void) {
  return RNPencilKit.class;
}

@end
