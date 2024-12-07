import { CharacterDetail } from "../components/Characters/CharacterDetail";
import { SpaceBackground } from "../components/SpaceBackground/SpaceBackground";

export function CharactersDetailPage() {
    return (
        <div className="wrapper">
            <SpaceBackground planets={25} />
            <CharacterDetail />
        </div>
    );
}
