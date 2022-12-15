using JavaScriptEngineSwitcher.Core;
using JavaScriptEngineSwitcher.V8;
using React;

[assembly: WebActivatorEx.PreApplicationStartMethod(typeof(ReactMvcExample.ReactConfig), "Configure")]

namespace ReactMvcExample;

public static class ReactConfig
{
    public static void Configure()
    {
        ReactSiteConfiguration.Configuration
            .SetLoadBabel(false)
            .AddScriptWithoutTransform("~/Scripts/dist/vendor.js")
            .AddScriptWithoutTransform("~/Scripts/dist/runtime.js")
            .AddScriptWithoutTransform("~/Scripts/dist/components.js");

        JsEngineSwitcher.Current.DefaultEngineName = V8JsEngine.EngineName;
        JsEngineSwitcher.Current.EngineFactories.AddV8();
    }
}