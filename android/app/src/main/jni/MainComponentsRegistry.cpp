#include <memory>
#include <string>
#include <ReactCommon/TurboModuleManagerDelegate.h>
#include <fbjni/fbjni.h>
namespace facebook {
namespace react {
class MainApplicationTurboModuleManagerDelegate
    : public jni::HybridClass<
          MainApplicationTurboModuleManagerDelegate,
          TurboModuleManagerDelegate> {
 public:
  // Adapt it to the package you used for your Java class.
  static constexpr auto kJavaDescriptor =
      "Lapp/radzima/newarchitecture/modules/MainApplicationTurboModuleManagerDelegate;";
  static jni::local_ref<jhybriddata> initHybrid(jni::alias_ref<jhybridobject>);
  static void registerNatives();
  std::shared_ptr<TurboModule> getTurboModule(
      const std::string &name,
      const std::shared_ptr<CallInvoker> &jsInvoker) override;
  std::shared_ptr<TurboModule> getTurboModule(
      const std::string &name,
      const JavaTurboModule::InitParams &params) override;
  /**
   * Test-only method. Allows user to verify whether a TurboModule can be
   * created by instances of this class.
   */
  bool canCreateTurboModule(const std::string &name);
};
} // namespace react
} // namespace facebook
android/app/src/main/jni/MainComponentsRegistry.cpp ADDED1 hidden comment
#include "MainComponentsRegistry.h"
#include <CoreComponentsRegistry.h>
#include <fbjni/fbjni.h>
#include <react/renderer/componentregistry/ComponentDescriptorProviderRegistry.h>
#include <react/renderer/components/rncore/ComponentDescriptors.h>
#include <rncli.h>
namespace facebook {
namespace react {
MainComponentsRegistry::MainComponentsRegistry(ComponentFactory *delegate) {}
std::shared_ptr<ComponentDescriptorProviderRegistry const>
MainComponentsRegistry::sharedProviderRegistry() {
  auto providerRegistry = CoreComponentsRegistry::sharedProviderRegistry();
  // Autolinked providers registered by RN CLI
  rncli_registerProviders(providerRegistry);
  // Custom Fabric Components go here. You can register custom
  // components coming from your App or from 3rd party libraries here.
  //
  // providerRegistry->add(concreteComponentDescriptorProvider<
  //        AocViewerComponentDescriptor>());
  return providerRegistry;
}
jni::local_ref<MainComponentsRegistry::jhybriddata>
MainComponentsRegistry::initHybrid(
    jni::alias_ref<jclass>,
    ComponentFactory *delegate) {
  auto instance = makeCxxInstance(delegate);
  auto buildRegistryFunction =
      [](EventDispatcher::Weak const &eventDispatcher,
         ContextContainer::Shared const &contextContainer)
      -> ComponentDescriptorRegistry::Shared {
    auto registry = MainComponentsRegistry::sharedProviderRegistry()
                        ->createComponentDescriptorRegistry(
                            {eventDispatcher, contextContainer});
    auto mutableRegistry =
        std::const_pointer_cast<ComponentDescriptorRegistry>(registry);
    mutableRegistry->setFallbackComponentDescriptor(
        std::make_shared<UnimplementedNativeViewComponentDescriptor>(
            ComponentDescriptorParameters{
                eventDispatcher, contextContainer, nullptr}));
    return registry;
  };
  delegate->buildRegistryFunction = buildRegistryFunction;
  return instance;
}
void MainComponentsRegistry::registerNatives() {
  registerHybrid({
      makeNativeMethod("initHybrid", MainComponentsRegistry::initHybrid),
  });
}
} // namespace react
} // namespace facebook