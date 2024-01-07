import Image from "next/image";

const ProfileHeader = ({
  accountId,
  authUserId,
  name,
  username,
  bio,
  imgURL,
}: {
  accountId: string;
  authUserId: string;
  name: string;
  username: string;
  bio: string;
  imgURL: string;
}) => {
  return (
    <div className="w-full flex flex-col justify-start">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative h-20 w-20 object-cover">
            <Image
              src={imgURL}
              alt="Profile Picture"
              fill
              className="rounded-full object-cover shadow-2xl"
            />
          </div>

          <div className="flex-1">
            <h2 className="text-heading3-bold text-left text-light-1">
              {name}
            </h2>
            <p className="text-base-semibold text-gray-1">@{username}</p>
          </div>
        </div>
      </div>
      {/* TODO : Community */}

      <p className="mt-6 text-base-regular text-light-2 max-w-lg">{bio}</p>

      <div className="mt-12 h-0.5 w-full bg-dark-3" />
    </div>
  );
};

export default ProfileHeader;
