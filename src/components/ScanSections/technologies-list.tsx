import React from 'react';
import {useAtom} from "jotai/index";
import {technologiesAtom} from "src/states/target-page";
import {ThirdPartyApi} from "src/global/contants/third-party-api";
import Image from "next/image";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "src/components/ui/accordion";
import useUID from "src/hooks/useUID";
import RotateLoader from "src/components/Loader/spinner";

function TechnologiesList() {
    const [technologies ,] = useAtom(technologiesAtom);
    const [genID] = useUID();

    if (!technologies) {
        return null;
    }
    const resolveIconPath = (name: string) => {
        return ThirdPartyApi.wrappalyzerIcon + name;
    }

    return (
        <div className={"flex flex-col bg-zinc-950 rounded-xl border border-zinc-700"}>
           <div className={"w-full px-4 py-4 font-semibold uppercase border-b border-zinc-700"}>Technologies</div>
            <Accordion type="single" collapsible className="w-full p-4">
                {technologies.length === 0 && (
                    <RotateLoader />
                )}
                {technologies.map((technology, index) => (
                    <AccordionItem key={genID()} value={technology.name} className={"border-zinc-800"}>
                        <AccordionTrigger>
                            <div className={"flex flex-col gap-2"}>
                                <div className={"flex flex-row gap-2"}>
                                    <Image className={"w-6 h-6"} width={50} height={50} unoptimized
                                           src={resolveIconPath(technology.icon)} alt={technology.name}/>
                                    <div className={"flex justify-center items-center"}>
                                        <div className={"text-sm font-semibold"}>{technology.name}</div>
                                        <div className={"text-xs"}>{technology.version}</div>
                                    </div>
                                </div>
                                <div className={"flex flex-wrap gap-1"}>
                                    {technology.categories.map((category, index) => (
                                        <div key={`category-${genID()}`}
                                           className={"text-[10px] text-zinc-300 bg-zinc-900 p-1 border border-zinc-800 rounded-full"}>
                                            <p className={"leading-[1]"}>{category.name}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent>
                            <div className={"text-xs text-zinc-300"}>{technology.description}</div>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    );
}

export default TechnologiesList;