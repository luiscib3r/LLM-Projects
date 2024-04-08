import { getDefaultApiConfig, setDefaultLlmApi } from "@/lib/config";
import { getLlmApis } from "@/lib/llmapi";
import { SelectModal } from "./select_modal";

export const Header = async () => {
  const getDefaultApiConfigAction = async () => {
    "use server";

    const config = await getDefaultApiConfig();

    return config;
  };

  const setDefaultLlmApiAction = async (apiId: string) => {
    "use server";

    await setDefaultLlmApi(apiId);
  };

  const apis = await getLlmApis();

  return (
    <div className="flex h-[82px] justify-between p-5">
      {/* <MobileSidebar /> */}
      <SelectModal
        getDefaultApiConfigAction={getDefaultApiConfigAction}
        setDefaultLlmApiAction={setDefaultLlmApiAction}
        apis={apis}
      />
    </div>
  );
};
